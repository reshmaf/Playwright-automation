import {test,expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name:'Login'}).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('add product to cart', async({page}) =>{

    const productTitle = page.locator('#item_4_title_link > div').innerText();
    const product = page.locator('#add-to-cart-sauce-labs-backpack');
    await product.click();
  
    const cartIcon = page.locator('.shopping_cart_link');
    await cartIcon.click();
  
    const cartProduct = page.waitForSelector('xpath=//*[@id="item_4_title_link"]/div');
    expect((await cartProduct).innerText(), await productTitle);

  });

test('checkout', async({page}) =>{

    const cartIcon = page.locator('.shopping_cart_link');
    await cartIcon.click();

    const checkOutIcon = await page.waitForSelector('#checkout');
    await checkOutIcon.click();

    await page.getByPlaceholder('First Name').click();
    await page.keyboard.type('Reshma');

    await page.getByPlaceholder('Last Name').click();
    await page.keyboard.type('123456');

    await page.getByPlaceholder('Zip/Postal Code').click();
    await page.keyboard.type('629160');

    await page.locator('#continue').click();

    expect(await page.locator('#finish').isVisible());
  })
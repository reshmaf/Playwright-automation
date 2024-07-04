import {test,expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name:'Login'}).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('has hamburger icon', async({page}) =>{

  const hamburger = page.locator('.bm-burger-button');
  await expect(hamburger).toBeVisible();
    
});

test('hamburger menu options', async({page}) => {

  const expectedOptions = ['All Items', 'About', 'Logout', 'Reset App State'];

  await page.locator('xpath=//*[@id="react-burger-menu-btn"]').click();

  // const menuOptions = page.locator('.menu-item');
  // await expect(menuOptions).toHaveCount(4); //check count

  const menuOptions = page.$$('.menu-item');
  expect((await menuOptions).length).toBe(4);

  for(const menu of await menuOptions){
    //console.log(await menu.innerText()); //print options
    expect(expectedOptions).toContain(await menu.innerText());
  } 

});

test('close hamburger menu', async({page}) =>{
  const hamburgerIcon = page.locator('xpath=//*[@id="react-burger-menu-btn"]');
  await hamburgerIcon.click();

  const closeIcon = page.locator('xpath=//*[@id="react-burger-cross-btn"]');
  await closeIcon.isVisible();
  closeIcon.click();

  await expect(hamburgerIcon).toBeVisible();

});

test('logout', async({page}) => {
  const hamburgerIcon = page.locator('xpath=//*[@id="react-burger-menu-btn"]');
  await hamburgerIcon.click();

  const logoutIcon = page.waitForSelector('xpath=//*[@id="logout_sidebar_link"]');
  (await logoutIcon).click();

  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();

});

test('has cart icon', async({page}) =>{

  const cartIcon = page.locator('.shopping_cart_link');
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();

  const cartText = page.locator('xpath=//*[@id="header_container"]/div[2]/span');
  await expect(cartText).toHaveText('Your Cart');

});

// test('verify filter', async({page}) =>{

//   const filterIcon = page.locator('xpath=//*[@id="header_container"]/div[2]/div/span/select');
//   await filterIcon.isVisible();
//   await filterIcon.click();

//   const lowToHigh = page.locator('xpath=//*[@id="header_container"]/div[2]/div/span/select/option[3]');
//   await lowToHigh.hover();
//   await page.keyboard.press('Enter');
  
//   //TODO: verify its sorted based on price

// });
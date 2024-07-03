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

  await page.locator('.bm-burger-button').click();

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
  const hamburgerIcon = page.locator('.bm-burger-button');
  await hamburgerIcon.click();

  const closeIcon = page.locator('.bm-cross-button');
  await expect(closeIcon).toBeVisible();
  await closeIcon.click();

  await expect(hamburgerIcon).toBeVisible();

});
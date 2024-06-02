import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle(/Swag Labs/);

});

test('click login button', async ({ page }) => {

    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);

    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();

    //assert
    const errorLocator = page.locator('h3');
    await expect(errorLocator).toHaveText(/Epic sadface: Username is required/);

});

test('login fail', async ({ page }) => {

    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.getByPlaceholder('Username').fill('Reshma');
    await page.getByPlaceholder('Password').fill('Sona1234');

    const loginButton = page.getByRole('button', {name: 'Login'});
    await loginButton.click();

    const errorLocator = page.locator('h3');
    await expect(errorLocator).toHaveText(/Epic sadface: Username and password do not match any user in this service/);
});

test('login success', async ({page}) =>{

    await page.goto('/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});
 
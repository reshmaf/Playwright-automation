import { expect, test } from "@playwright/test";

test.beforeEach('open website', async ({page}) =>{

    await page.goto('https://demoqa.com/');

    const alertFramesBrowserIcon = page.locator('div.card-body > h5', { hasText: 'Alerts, Frame & Windows' });
    await alertFramesBrowserIcon.click();
    expect((await page.waitForSelector('xpath=//*[@id="app"]/div/div/div/div[1]/div/div/div[3]/span/div/div[1]')).isVisible());

    const alertsIcon = page.locator('.text', { hasText: 'Alerts' });
    await alertsIcon.click();
});

test('verify alert popup appears', async ({page}) =>{

    page.on('dialog', async (alert) => {
        console.log(alert.message());
        await alert.accept();
    })

    await page.click('#alertButton');
});
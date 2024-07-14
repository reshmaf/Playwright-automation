import { expect, test } from "@playwright/test";
import assert from "assert";

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

test('verify modal dialog', async ({page}) =>{

    const dialogIcon = page.locator('.text', { hasText: 'Modal Dialogs' });
    await dialogIcon.click();

    await page.click('#showSmallModal');
    await page.waitForSelector('.modal-content');
    await page.locator('xpath=/html/body/div[5]/div/div/div[1]/button/span[1]').click();
    
});

//debug
// test('frames verification', async ({page}) =>{
//     const nesterdFrameIcon = page.locator('.text', { hasText: 'Nested Frames' });
//     await nesterdFrameIcon.click();

//     const allFrames = page.frames();
//     console.log('No of frames' + allFrames.length);
//     //expect(allFrames.length).toEqual(2);

//     const mainFrame = await page.frame('iframe[id="frame1"]');
//     const mainFrameText = await mainFrame?.textContent('p');
//     console.log('Main frame text content:', mainFrameText);

//     expect(mainFrameText).toBe('Hi');
    
// });

test('verify new tab', async ({page}) =>{

    const browserIcon = page.locator('.text', { hasText: 'Browser Windows'});
    await browserIcon.click();

    const tabIcon = page.locator('button#tabButton');
    await tabIcon.click();
    //todo
    
});

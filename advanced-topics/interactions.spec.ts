import { expect, test } from "@playwright/test";

test.beforeEach('open website', async ({page}) =>{

    await page.goto('https://demoqa.com/');

    const interactionsIcon = page.locator('div.card-body > h5', { hasText: 'Interactions' });
    const parentIcon = interactionsIcon.locator('..');

    await parentIcon.click();
    expect((await page.waitForSelector('xpath=//*[@id="app"]/div/div/div/div[1]/div/div/div[5]/span/div/div[1]')).isVisible());

    const droppableIcon = page.locator('.text', { hasText: 'Droppable' });
    await droppableIcon.click();
});

test('drag and drop', async ({page}) =>{
    const dragObject = page.locator('#draggable');
    const dropObject = page.locator('xpath=/html/body/div[2]/div/div/div/div[2]/div[2]/div/div[1]/div/div[2]');

    await dragObject.dragTo(dropObject);

    expect(page.locator('div#droppable > p', { hasText: 'Dropped!' }).isVisible());

});
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('SauceDemo - Login', function () {
  this.timeout(30000);

  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('Deve realizar login com usuário válido', async function () {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
    await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    await driver.wait(until.urlContains('/inventory.html'), 10000);

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/inventory.html'));

    const titleElement = await driver.wait(
      until.elementLocated(By.css('.title')),
      10000
    );

    const titleText = await titleElement.getText();
    assert.strictEqual(titleText, 'Products');

    const inventoryList = await driver.findElement(By.css('.inventory_list'));
    const isDisplayed = await inventoryList.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    const screenshot = await driver.takeScreenshot();
    const screenshotPath = path.join(
      __dirname,
      '..',
      'docs',
      'evidencias',
      'selenium',
      'login-valido-saucedemo.png'
    );

    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
  });
});
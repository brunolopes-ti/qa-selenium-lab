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

  async function salvarScreenshot(nomeArquivo) {
    const screenshot = await driver.takeScreenshot();

    const screenshotPath = path.join(
      __dirname,
      '..',
      'docs',
      'evidencias',
      'selenium',
      nomeArquivo
    );

    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
  }

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

    await salvarScreenshot('login-valido-saucedemo.png');
  });

  it('Deve exibir erro ao tentar login com usuário inválido', async function () {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.css('[data-test="username"]')).sendKeys('usuario_invalido');
    await driver.findElement(By.css('[data-test="password"]')).sendKeys('senha_invalida');
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    const errorElement = await driver.wait(
      until.elementLocated(By.css('[data-test="error"]')),
      10000
    );

    const isDisplayed = await errorElement.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    const errorText = await errorElement.getText();

    assert.ok(
      errorText.includes('Username and password do not match')
    );

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(!currentUrl.includes('/inventory.html'));

    await salvarScreenshot('login-invalido-saucedemo.png');
  });
});
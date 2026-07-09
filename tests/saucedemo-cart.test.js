const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('SauceDemo - Carrinho', function () {
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

  async function realizarLoginValido() {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
    await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    await driver.wait(until.urlContains('/inventory.html'), 10000);
  }

  it('Deve adicionar um produto ao carrinho', async function () {
    await realizarLoginValido();

    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-test="add-to-cart-sauce-labs-backpack"]')),
      10000
    );

    await addToCartButton.click();

    const cartBadge = await driver.wait(
      until.elementLocated(By.css('[data-test="shopping-cart-badge"]')),
      10000
    );

    const cartBadgeText = await cartBadge.getText();
    assert.strictEqual(cartBadgeText, '1');

    const removeButton = await driver.findElement(
      By.css('[data-test="remove-sauce-labs-backpack"]')
    );

    const isRemoveButtonDisplayed = await removeButton.isDisplayed();
    assert.strictEqual(isRemoveButtonDisplayed, true);

    await salvarScreenshot('produto-adicionado-carrinho-saucedemo.png');
  });
});
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('SauceDemo - Checkout', function () {
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

  async function adicionarProdutoEAbrirCarrinho() {
    await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]')).click();
    await driver.findElement(By.css('[data-test="shopping-cart-link"]')).click();

    await driver.wait(until.urlContains('/cart.html'), 10000);
  }

  it('Deve realizar checkout completo com sucesso', async function () {
    await realizarLoginValido();
    await adicionarProdutoEAbrirCarrinho();

    await driver.findElement(By.css('[data-test="checkout"]')).click();

    await driver.wait(until.urlContains('/checkout-step-one.html'), 10000);

    const informationTitle = await driver.findElement(By.css('.title')).getText();
    assert.strictEqual(informationTitle, 'Checkout: Your Information');

    await driver.findElement(By.css('[data-test="firstName"]')).sendKeys('Bruno');
    await driver.findElement(By.css('[data-test="lastName"]')).sendKeys('Ramos');
    await driver.findElement(By.css('[data-test="postalCode"]')).sendKeys('72000-000');

    await driver.findElement(By.css('[data-test="continue"]')).click();

    await driver.wait(until.urlContains('/checkout-step-two.html'), 10000);

    const overviewTitle = await driver.findElement(By.css('.title')).getText();
    assert.strictEqual(overviewTitle, 'Checkout: Overview');

    const productName = await driver.findElement(
      By.css('[data-test="inventory-item-name"]')
    ).getText();

    assert.strictEqual(productName, 'Sauce Labs Backpack');

    const productPrice = await driver.findElement(
      By.css('[data-test="inventory-item-price"]')
    ).getText();

    assert.strictEqual(productPrice, '$29.99');

    const subtotal = await driver.findElement(
      By.css('[data-test="subtotal-label"]')
    ).getText();

    assert.ok(subtotal.includes('Item total: $29.99'));

    await driver.findElement(By.css('[data-test="finish"]')).click();

    await driver.wait(until.urlContains('/checkout-complete.html'), 10000);

    const completeTitle = await driver.findElement(By.css('.title')).getText();
    assert.strictEqual(completeTitle, 'Checkout: Complete!');

    const completeHeader = await driver.findElement(
      By.css('[data-test="complete-header"]')
    ).getText();

    assert.strictEqual(completeHeader, 'Thank you for your order!');

    await salvarScreenshot('checkout-completo-saucedemo.png');
  });
});
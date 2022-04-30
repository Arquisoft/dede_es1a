import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  jest.setTimeout(100000)
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
    ? await puppeteer.launch()
    : await puppeteer.launch({ headless: true, slowMo:100}); //false to run tests locally
  page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });
  
  test("User Register", ({given,when,then}) => {
    let email:string
    let name:string
    let dni:string
    let password:string
    let confirmPassword:string

    given("Email and password of a user", () => {
      email = "adri@gmail.com"
      name = "Adri"
      dni = "12345678"
      password = "adri"
      confirmPassword = "adri"
    });

    when("I click in Regístrate", async () => {
      await page.setViewport({ width: 1200, height: 1300 });
      await expect(page).toMatch("Sedimentarias");
      await expect(page).toClick("a[href='/register']");
      await expect(page).toMatch("Crear cuenta");
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='name']", name);
      await expect(page).toFill("input[name='dni']", dni);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toFill("input[name='confirmPassword']", confirmPassword);
      await expect(page).toClick('button', { text: 'Regístrate' });
    });

    then("I should be redirected to the catalog", async () => {
      await page.waitForNavigation()
      await page.waitForTimeout(2000);
      await expect(page).toMatch("Yeso");
    });
  });
});

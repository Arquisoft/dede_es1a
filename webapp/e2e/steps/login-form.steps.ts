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
  
  test("User Login", ({given,when,then}) => {
    let email:string
    let password:string

    given("Email and password of a user", () => {
      email = "admin@gmail.com"
      password = "admin"
    });

    when("I click in Iniciar Sesion", async () => {
      await page.setViewport({ width: 1200, height: 1300 });
      await expect(page).toMatch("Sedimentarias");
      await expect(page).toClick("a[href='/login']");
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick('button', { text: 'Iniciar Sesión' });
    });

    then("I should be redirected to the catalog", async () => {
      await page.waitForNavigation()
      await page.waitForTimeout(2000);
      await expect(page).toMatch("Yeso");
    });
  });

  test("User Login", ({given,when,then}) => {
    let email:string
    let password:string

    given("Blank Email and password of a user", () => {
      email = " "
      password = "admin"
    });

    when("I click in Iniciar Sesion", async () => {
      await page.setViewport({ width: 1200, height: 1300 });
      await expect(page).toMatch("Sedimentarias");
      await expect(page).toClick("a[href='/login']");
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick('button', { text: 'Iniciar Sesión' });
    });

    then("Warning below email", async () => {
      await expect(page).toMatch("El campo no puede estar vacio");
    });
  });

});
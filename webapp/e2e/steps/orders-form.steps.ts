import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/orders-form.feature');

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
  
  test("Orders in profile", ({given,when,then}) => {
    let email:string
    let password:string

    given("Admin session", () => {
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
      await page.waitForNavigation()
      await page.waitForTimeout(2000);
      await expect(page).toMatch("Yeso");
      await expect(page).toClick("a[href='/orders']");
      

    });

    then("I should see admin order's history", async () => {
        await page.waitForNavigation()
        await page.waitForTimeout(2000);
        await expect(page).toMatch("Cuarcita");     
    });
  });
});

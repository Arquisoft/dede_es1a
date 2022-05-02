import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'
const feature = loadFeature('./features/orders-form.feature');

let page: puppeteer.Page;
let page2: puppeteer.Page;
let page3: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  jest.setTimeout(100000)
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
    ? await puppeteer.launch()
    : await puppeteer.launch({ headless: true, slowMo:100}); //false to run tests locally
  page = await browser.newPage();
  page2 = await browser.newPage();
  page3 = await browser.newPage();

    await page
      .goto(apiEndPoint + '/login', {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  
    await page2
      .goto(apiEndPoint + '/catalog', {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await page3
      .goto(apiEndPoint + '/orders', {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });
  
  test("Orders of user admin", ({given,when,then}) => {
    let email:string
    let password:string

    given("Registered user admin", () => {
      email = "admin@gmail.com"
      password = "admin"
    });

    when("Log In and click on my profile", async () => {
      await expect(page).toFill("#email", email);
      await expect(page).toFill("#password", password);
      await expect(page).toClick('button', { text: 'Iniciar Sesión' });
      await expect(page2).toMatch("Mohs");
    });

    then("I should see my orders", async () => {
      await page2.waitForTimeout(2000);
      await expect(page2).toClick("a[href='/orders']");
      await expect(page3).toMatch("Cuarcita");
    });
  });

});
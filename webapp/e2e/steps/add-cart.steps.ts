import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'
const feature = loadFeature('./features/add-cart.feature');

let page: puppeteer.Page;
let page2: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
    beforeEach(async () => {
      browser = process.env.GITHUB_ACTIONS
        ? await puppeteer.launch()
        : await puppeteer.launch({ headless: true });
      page = await browser.newPage();
  
      await page
        .goto(apiEndPoint + "/login", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
  
        page2 = await browser.newPage();
  
        await page2
          .goto(apiEndPoint + "/catalog", {
           waitUntil: "networkidle0",
          })
          .catch(() => {}); 
    });
  
  test("Usuario logeado añade a carrito", ({given,when,then}) => {
    let email:string
    let password:string

    given("Dado un usuario logeado", () => {
      email = "admin@gmail.com"
      password = "admin"
    });

    when("Añado un producto", async () => {
      await page.setViewport({ width: 1200, height: 1300 });
      await expect(page).toMatch('Iniciar Sesión')
      await expect(page).toFill("#email", email);
      await expect(page).toFill("#password", password);
      await expect(page).toClick('button', { text: 'Iniciar Sesión' });
      await expect(page2).toMatch("Mohs");
      await expect(page2).toClick('button', { text: 'Comprar' });
      await page2.waitForNavigation;
      await page2.waitForTimeout(2000);
    });

    then("Se ve en el carrito", async () => {
      await expect(page2).toMatch("Yeso");
    });
  });

});
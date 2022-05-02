import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'

const feature = loadFeature('./features/logout-form.feature');

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

  test('User log in and then Log out', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('Email and password of a user', () => {
      email = "admin@gmail.com"
      password = "admin"
    });

    when('I click in sign in and the sign out', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#password', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
      await expect(page2).toMatch('Mohs')
      await page2.waitForNavigation;
      await page2.waitForTimeout(2000);
   //   await expect(page2).toClick("a[href='/logout']")
    });

    then('I should be redirected to the catalog', async () => {
        await expect(page2).toMatch('Mohs')
    });
  })
});
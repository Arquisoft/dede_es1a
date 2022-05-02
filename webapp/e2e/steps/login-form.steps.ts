import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'

const feature = loadFeature('./features/login-form.feature');

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

  test('The user log in', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('Email and password of a user', () => {
      email = "admin@gmail.com"
      password = "admin"
    });

    when('I click in Iniciar Sesión', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#password', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
    });

    then('I should be redirected to the catalog', async () => {
      await expect(page2).toMatch('Mohs')
    });
  })


  test('User log in blank email', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('Blank Email and password of a user', () => {
      email = " "
      password = "adri"
    });

    when('I click in Iniciar Sesión', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#password', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
    });

    then('Warning message below Email', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

  test('User log in blank password', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('Email and blank password of a user', () => {
      email = "adri"
      password = " "
    });

    when('I click in Iniciar Sesión', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#password', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
    });

    then('Warning message below Password', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  afterEach(async ()=>{
    browser.close()
  })
  
});
import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'

const feature = loadFeature('./features/register-form.feature');

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
      .goto(apiEndPoint + "/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

      page2 = await browser.newPage();

      await page2
        .goto(apiEndPoint + "/login", {
         waitUntil: "networkidle0",
        })
        .catch(() => {}); 
  });


  test('The user is not registered in the site', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('An unregistered user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('I should be redirected to Login Page', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })


  test('User Register blank email', ({given,when,then}) => {


    given('Name, Dni, Password and confirmPassword of a user', () => {
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below email', async () => {
      await expect(page).toMatch('La casilla no puede estar vacia')
    });
  })

  test('User Register blank name', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Email, Dni, Password and confirmPassword of a user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below name', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })

  test('User Register blank dni', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Name, Email, Password and confirmPassword of a user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below dni', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })

  test('User Register blank password', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Name, Dni, Email and confirmPassword of a user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below Password', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })

  test('User Register blank confirmPassword', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Name, Dni, Password and Email of a user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below confirmPassword', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })

  test('Password and Confirm Password dont match', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Email, Name, Dni, Password and confirmPassword of a user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Warning below confirmPassword (Las contraseñas no coinciden)', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })

  afterEach(async ()=>{
    browser.close()
  });


  afterEach(async ()=>{
    browser.close()
  });

});

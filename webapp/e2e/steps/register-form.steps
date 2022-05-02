import { AddToDrive } from '@mui/icons-material';
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


  test('The user register in the site', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('An unregistered user', () => {
      email = "adri@gmail.com"
      name = "adri"
      dni = "1234"
      password = "adri"
      confirmPassword="adri"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('I should be redirected to Login Page', async () => {
      await expect(page2).toMatch('Iniciar Sesión')
    });
  })


  test('User Register blank email', ({given,when,then}) => {
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;


    given('Name, Dni, Password and confirmPassword of a user', () => {
      email = " "
      name = "adri"
      dni = "1234"
      password = "adri"
      confirmPassword="adri"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below email', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  test('User Register blank name', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('Email, Dni, Password and confirmPassword of a user', () => {
      email = "adri@gmail.com"
      name = " "
      dni = "1234"
      password = "adri"
      confirmPassword="adri"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below name', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  test('User Register blank dni', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('Name, Email, Password and confirmPassword of a user', () => {
      email = "adri@gmail.com"
      name = "adri"
      dni = " "
      password = "adri"
      confirmPassword="adri"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below dni', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  test('User Register blank password', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('Name, Dni, Email and confirmPassword of a user', () => {
      email = "adri@gmail.com"
      name = "adri"
      dni = "1234"
      password = " "
      confirmPassword="adri"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below Password', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  test('User Register blank confirmPassword', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('Name, Dni, Password and Email of a user', () => {
      email = "adri@gmail.com"
      name = "adri"
      dni = "1234"
      password = "adri"
      confirmPassword=" "
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below confirmPassword', async () => {
      await expect(page).toMatch('El campo no puede estar vacio')
    });
  })

  test('Password and Confirm Password dont match', ({given,when,then}) => {
    
    let email:string;
    let name:string;
    let dni:string;
    let password:string;
    let confirmPassword:string;

    given('Email, Name, Dni, Password and confirmPassword of a user', () => {
      email = "adri@gmail.com"
      name = "adri"
      dni = "1234"
      password = "adri"
      confirmPassword="adri2"
    });

    when('I fill the data in the form and press Regístrate', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#dni', dni);
      await expect(page).toFill('#password', password);
      await expect(page).toFill('#confirmPassword', confirmPassword);

      await expect(page).toClick('button', { text: 'Regístrate' })
    });

    then('Warning below confirmPassword (Las contraseñas no coinciden)', async () => {
      await expect(page).toMatch('Las contraseñas no coinciden')
    });
  })

  afterEach(async ()=>{
    browser.close()
  });

});

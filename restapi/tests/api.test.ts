import request, { Response } from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import path from 'path';

let app: Application;
let server: http.Server;
const mongoose = require('mongoose');
let envPath = path.resolve("../.env");
require('dotenv').config({ path: envPath });

let expressSession = require('express-session');
declare global {
    namespace Express {
        interface Request {
            session: typeof expressSession;
        }
    }
}

beforeAll(async () => {

    app = express();

    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());

    app.use(expressSession({
        secret: 'abcdefg',
        resave: true,
        saveUninitialized: true,
    }));

    app.use("/api", api)

    const port: number = 5000;
    server = app.listen(port, (): void => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });
    //This database is for testing only
    mongoose.connect("mongodb+srv://dede-es1a-Tests:1234@dede-es1a-tests.z8kxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    server.close() //close the server
    mongoose.connection.close();
})

describe('user ', () => {

    jest.setTimeout(100000);
    const crypto = require('crypto');
    const pass = crypto.randomBytes(4).toString('utf8');

    /**
     * Tests that a user can be created through the user without throwing any errors.
     */
    it('can be created correctly', async () => {

        let username: string = 'Pablo'
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('cant be created correctly', async () => {

        let username: string = 'Pablo'
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('cant be created correctly 2', async () => {

        let username: string = ''
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('cant be created correctly 3', async () => {

        let username: string = 'Pablo'
        let email: string = ''
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('cant be created correctly 4', async () => {

        let username: string = 'Pablo'
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('cant be created correctly 5', async () => {

        let username: string = 'Pablo'
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: "",
                repeatPassword: pass
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('cant be created correctly 6', async () => {

        let username: string = 'Pablo'
        let email: string = 'gonzalezgpablo@uniovi.es'
        const response: Response = await request(app).post('/api/users/add')
            .send({
                dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass,
                repeatPassword: ""
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    /**
 * Test that we can list users without any error.
 */
    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/users/list");
        expect(response.body[0].email).toBe("gonzalezgpablo@uniovi.es");
        expect(response.statusCode).toBe(200);
    });

    /**
 * Test that we can login users without any error.
 */
    it('can be login', async () => {
        const response: Response = await request(app).post("/api/users/login")
            .send({
                email: "gonzalezgpablo@uniovi.es",
                password: pass
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

       /**
 * Test that we cant login user.
 */
        it('cant be login', async () => {
            const response: Response = await request(app).post("/api/users/login")
                .send({
                    email: "g",
                    password: pass
                })
                .set('Accept', 'application/json');
            expect(response.statusCode).toBe(401);
        });

    /**
* Test that we can logout users without any error.
*/
    it('can be logout', async () => {
        const response: Response = await request(app).get("/api/users/logout");
        expect(response.statusCode).toBe(200);
    });

    /**
 * Tests that a user can be deleted through the user without throwing any errors.
 */
    it('can be deleted', async () => {
        const response: Response = await request(app).post("/api/users/delete")
            .send({ dni: "1" })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

});

describe('product ', () => {
    jest.setTimeout(10000);
    
    it('can be created correctly', async () => {
        const response: Response = await request(app).post('/api/rocks/add').
            send({
                rockId: "prueba",
                name: "prueba",
                type: "sedimentaria",
                description: "prueba",
                price: 1,
                mohsHardness: 1,
                density: 1,
                texture: "prueba",
                img: "prueba"
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('cant be created correctly', async () => {
        const response: Response = await request(app).post('/api/rocks/add').
            send({
                rockId: "prueba",
                name: "prueba",
                type: "sedimentaria",
                description: "prueba",
                price: 1,
                mohsHardness: 1,
                density: 1,
                texture: "prueba",
                img: "prueba"
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(401);
    });

    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/rocks/list");
        expect(response.body[0].name).toBe("prueba");
        expect(response.statusCode).toBe(200);
    });

    it('can be created correctly 2', async () => {
        const response: Response = await request(app).post('/api/rocks/add').
            send({
                rockId: "prueba2",
                name: "prueba2",
                type: "ígnea",
                description: "prueba",
                price: 1,
                mohsHardness: 1,
                density: 1,
                texture: "prueba",
                img: "prueba"
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('can be created correctly 3', async () => {
        const response: Response = await request(app).post('/api/rocks/add').
            send({
                rockId: "prueba3",
                name: "prueba3",
                type: "metamórfica",
                description: "prueba",
                price: 1,
                mohsHardness: 1,
                density: 1,
                texture: "prueba",
                img: "prueba"
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('can be listed by critery', async () => {
        const response: Response = await request(app).get("/api/rocks/list/critery")
            .send({critery : {name : "prueba"}})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('can be listed by sedimetary', async () => {
        const response: Response = await request(app).get("/api/rocks/list/sedimentary")
        expect(response.body[0].type).toBe("sedimentaria");
        expect(response.statusCode).toBe(200);
    });

    it('can be listed by fiery', async () => {
        const response: Response = await request(app).get("/api/rocks/list/fiery")
        expect(response.body[0].type).toBe("ígnea");
        expect(response.statusCode).toBe(200);
    });

    it('can be listed by metamorphic', async () => {
        const response: Response = await request(app).get("/api/rocks/list/metamorphic")
        expect(response.body[0].type).toBe("metamórfica");
        expect(response.statusCode).toBe(200);
    });

    it('can be listed by id', async () => {
        const response: Response = await request(app).get("/api/rocks/" + "prueba3")
        expect(response.body[0].rockId).toBe("prueba3");
        expect(response.statusCode).toBe(200);
    });

    it('can be deleted', async () => {
        const response: Response = await request(app).post("/api/rocks/delete")
            .send({ rockId: "prueba" })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('can be deleted 2', async () => {
        const response: Response = await request(app).post("/api/rocks/delete")
            .send({ rockId: "prueba2" })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('can be deleted 3', async () => {
        const response: Response = await request(app).post("/api/rocks/delete")
            .send({ rockId: "prueba3" })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});


describe('order ', () => {
    jest.setTimeout(10000);
    
    it('can be created correctly', async () => {
        const response: Response = await request(app).post('/api/orders/add').
            send({
                orderId: "prueba",
                userEmail: "prueba",
                productId: "prueba",
                price: 3,
                productName: "prueba",
                productType: "prueba"
            })
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/orders/userList/" + "prueba")
            .send({userEmail : "prueba"})
            .set('Accept', 'application/json');
        expect(response.body[0].userEmail).toBe("prueba");
        expect(response.statusCode).toBe(200);
    });

    it('cant be listed', async () => {
        const response: Response = await request(app).get("/api/orders/userList/")
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(404);
    });

    it('can obtain deliveryCosts', async () => {
        const response: Response = await request(app).post("/api/orders/deliveryCosts")
            .send({address : "Palmira Villa, Oviedo"})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('can get the best seller', async () =>{
        const response: Response = await request(app).get("/api/rocks/list/best-seller")
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});
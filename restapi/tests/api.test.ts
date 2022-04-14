import request, { Response } from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import { findUsers, addUser, deleteUser, loginUser, logout } from '../controllers/UserController';
import path from 'path';
import { send } from 'process';

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

    mongoose.connect(process.env.DB_CONN_TEST_STRING, {
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

    it('can be listed by critery', async () => {
        const response: Response = await request(app).get("/api/rocks/list/critery")
            .send({critery : {name : "prueba"}})
            .set('Accept', 'application/json');
        expect(response.body[0].name).toBe("prueba");
        expect(response.statusCode).toBe(200);
    });

    it('can be deleted', async () => {
        const response: Response = await request(app).post("/api/rocks/delete")
            .send({ rockId: "prueba" })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});
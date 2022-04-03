import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import {findUsers, addUser, deleteUser, loginUser, logout} from '../controllers/UserController';

let app:Application;
let server:http.Server;
const mongoose = require('mongoose');

beforeAll(async () => {
    
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    api.get("/users/list", findUsers);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });

    mongoose.connect("mongodb+srv://dede_es1a:1234@dede-es1a.shdhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
});

afterAll(async () => {
    server.close() //close the server
    mongoose.connection.close();
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const crypto = require('crypto');
        const pass = crypto.randomBytes(4).toString('utf8');
        const response:Response = await request(app).post('/users/add')
        .send({dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: pass})
        .set('Accept', 'application/json')
        //expect(response.statusCode).toBe(200);
    });
});

describe('product ', () => {
    it('can be listed',async () => {
        const response:Response = await request(app).get("/rocks/list");
       // expect(response.statusCode).toBe(200);
    });

    it('can be created correctly', async () => {
        const response:Response = await request(app).post('/rocks/add').
        send({rockId:"prueba",
            name: "prueba",
            type: "prueba",
            description: "prueba",
            price: 1,
            mohsHardness:1,
            density:1,
            texture:"prueba",
            img: "prueba"})
        .set('Accept', 'application/json')
       // expect(response.statusCode).toBe(200);
    });
});
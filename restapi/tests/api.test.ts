import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add')
        .send({dni: "1",
                name: username,
                email: email,
                rol: 1,
                password: "q"})
        .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});

describe('product ', () => {
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/rocks/list");
        expect(response.statusCode).toBe(200);
    });

    it('can be created correctly', async () => {
        const response:Response = await request(app).post('/api/rocks/add').
        send({rockId:"1",
            name: "prueba",
            type: "prueba",
            description: "prueba",
            price: 1,
            mohsHardness:1,
            density:1,
            texture:"prueba",
            img: "prueba"})
        .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});
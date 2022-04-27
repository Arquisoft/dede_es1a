import express, { Application, RequestHandler } from "express";

import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 

const app: Application = express();
const port =process.env.PORT|| 5000;

require('dotenv').config();

const mongoose = require('mongoose');

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000',' http://*.compute-1.amazonaws.com'] // NOSONAR
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

let expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
}));
declare global{
  namespace Express{
      interface Request{
        session: typeof expressSession;
      }
    }
}

app.use("/api", api)

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

mongoose.connect(process.env.DB_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected')
}).catch((err: Error) => {
  console.log(process.env.DB_CONN_STRING)
  console.error(err)
})

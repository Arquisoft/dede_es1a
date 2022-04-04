import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { addOrder, findOrdersByUserDni, getDeliveryCosts } from './controllers/OrderController';
import {findRocks, addRock, deleteRock, findRocksSedimentary, findRocksMetamorphic, findRocksFiery, findByCritery} from './controllers/RockController';
import {findUsers, addUser, deleteUser, loginUser, logout} from './controllers/UserController';
const User = require("./models/User");
const Rock = require("./models/Rock");


const api:Router = express.Router()
const mongoose = require("mongoose");

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);


api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post("/users/login", loginUser);

api.get("/users/logout",  logout);


//Methods for product of the app
api.get("/rocks/list", findRocks);

api.get("/rocks/list/sedimentary", findRocksSedimentary);

api.get("/rocks/list/metamorphic", findRocksMetamorphic);

api.get("/rocks/list/fiery", findRocksFiery);

api.get("/rocks/list/critery", findByCritery);

api.post("/rocks/add", addRock);

api.post("/rocks/delete", deleteRock);

//Methods for product of the app
api.get("/orders/userList", findOrdersByUserDni);

api.post("/orders/add", addOrder);

api.get("/orders/deliveryCosts", getDeliveryCosts)

export default api;
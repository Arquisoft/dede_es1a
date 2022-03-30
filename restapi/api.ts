import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import {findRocks, addRock, deleteRock} from './controllers/RockController';
import {findUsers, addUser, deleteUser} from './controllers/UserController';
const User = require("./models/User");
const Rock = require("./models/Rock");

import {findRocks, addRock, deleteRock, findRocksSedimentary, findRocksMetamorphic, findRocksFiery} from './controllers/RockController';
import {findUsers, addUser, deleteUser, loginUser, logout} from './controllers/UserController';

const api:Router = express.Router()
const mongoose = require("mongoose");

<<<<<<< HEAD
//Methods for control users from the app
api.get("/users/list", findUsers);

api.post("/users/add", addUser);

api.post("/users/delete", deleteUser);

//Methods for product of the app
api.get("/rocks/list", findRocks);

api.post("/rocks/add", addRock);

api.post("/rocks/delete", deleteRock);
=======
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
>>>>>>> parent of 99783bd... Solución problemas develop

api.post("/users/login", loginUser);

api.get("/users/logout",  logout);


//Methods for product of the app
api.get("/rocks/list", findRocks);

api.get("/rocks/list/sedimentary", findRocksSedimentary);

api.get("/rocks/list/metamorphic", findRocksMetamorphic);

api.get("/rocks/list/fiery", findRocksFiery);

api.post("/rocks/add", addRock);

api.post("/rocks/delete", deleteRock);

export default api;
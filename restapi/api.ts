import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { addOrder, findOrdersByUserDni, getDeliveryCosts } from './controllers/OrderController';
import {findRocks, addRock, deleteRock, findRocksSedimentary, findRocksMetamorphic, findRocksFiery, findByCriteryText, findByCriteryNumber} from './controllers/RockController';
import {findUsers, addUser, deleteUser, loginUser, logout} from './controllers/UserController';
const User = require("./models/User");
const Rock = require("./models/Rock");

const api:Router = express.Router()
const mongoose = require("mongoose");

//Methods for control users from the app
api.get("/users/list", findUsers);

api.post("/users/add", addUser);

api.post("/users/delete", deleteUser);

api.post("/users/login", loginUser);

api.get("/users/logout",  logout);


//Methods for product of the app
api.get("/rocks/list", findRocks);

api.get("/rocks/list/sedimentary", findRocksSedimentary);

api.get("/rocks/list/metamorphic", findRocksMetamorphic);

api.get("/rocks/list/fiery", findRocksFiery);

api.get("/rocks/list/criteryText", findByCriteryText);

api.get("/rocks/list/criteryNumber", findByCriteryNumber);

api.post("/rocks/add", addRock);

api.post("/rocks/delete", deleteRock);

//Methods for product of the app
api.get("/orders/userList", findOrdersByUserDni);

api.post("/orders/add", addOrder);

api.get("/orders/deliveryCosts", getDeliveryCosts)

export default api;
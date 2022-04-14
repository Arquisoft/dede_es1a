import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { addOrder, findOrdersByUserEmail, getDeliveryCosts } from './controllers/OrderController';
import {findRocks, addRock, deleteRock, findRocksSedimentary, findRocksMetamorphic, findRocksFiery, findByCritery} from './controllers/RockController';
import {findUsers, addUser, deleteUser, loginUser, logout} from './controllers/UserController';
const User = require("./models/User");
const Rock = require("./models/Rock");


const api:Router = express.Router()
const mongoose = require("mongoose");

api.get("/users/list",findUsers);

api.post("/users/add",addUser);

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
api.get("/orders/userList", findOrdersByUserEmail);

api.post("/orders/add", addOrder);

api.post("/orders/deliveryCosts", getDeliveryCosts)

export default api;
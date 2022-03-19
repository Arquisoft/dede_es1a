import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import {findRocks, addRock, deleteRock, findRocksSedimentary, findRocksMetamorphic, findRocksFiery} from './controllers/RockController';
import {findUsers, addUser, deleteUser} from './controllers/UserController';
const User = require("./models/User");
const Rock = require("./models/Rock");

const api:Router = express.Router()
const mongoose = require("mongoose");

//Methods for control users from the app
api.get("/users/list", findUsers);

api.post("/users/add", addUser);

api.post("/users/delete", deleteUser);

//Methods for product of the app
api.get("/rocks/list", findRocks);

api.get("/rocks/list/sedimentary", findRocksSedimentary);

api.get("/rocks/list/metamorphic", findRocksMetamorphic);

api.get("/rocks/list/fiery", findRocksFiery);

api.post("/rocks/add", addRock);

api.post("/rocks/delete", deleteRock);

export default api;
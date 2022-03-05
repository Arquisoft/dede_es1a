import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const User = require("./models/User");
const Stone = require("./models/Stone");

const api:Router = express.Router()

//Methods for control users from the app
api.get("/users/list", async (req, res) => {
  const users = await User.find({})
  res.send(users);
});

api.post("/users/add", async (req, res) => {

  let name = req.body.name;
  let email = req.body.email;

  let user = await User.findOne(
      { email: email }
  );
  if (user) {
      res.send({ error: "Error: This user is already registered " + email });
  }
  else {
      user = new User({
          name: name,
          email: email
      });
      await user.save();
      res.send(user);
  }
});

//Methods for product of the app
api.get("/stones/list", async (req, res) => {
  const stones = await Stone.find({})
  res.send(stones);
});

api.post("/stones/add", async (req, res) => {

  let name = req.body.name;
  let type = req.body.type;
  let description = req.body.description;
  let price = req.body.price;

  let stone = await Stone.findOne(
      { name: name }
  );
  if (stone) {
      res.send({ error: "Error: This stone is already in the app " + name });
  }
  else {
    stone = new Stone({
          name: name,
          type: type,
          description: description,
          price: price
      });
      await stone.save();
      res.send(stone);
  }
});


export default api;
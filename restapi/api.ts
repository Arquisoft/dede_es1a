import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const User = require("./models/User");
const Rock = require("./models/Rock");

const api:Router = express.Router()
const mongoose = require("mongoose");

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

api.post("/users/delete", async (req, res) => {

  let email = req.body.email;

  let user = await User.deleteOne(
      { email: email }
  );
  res.send(user);
});

//Methods for product of the app
api.get("/rocks/list", async (req, res) => {
  const rocks = await Rock.find({})
  res.send(rocks);
});

api.post("/rocks/add", async (req, res) => {

  let name = req.body.name;
  let type = req.body.type;
  let description = req.body.description;
  let price = req.body.price;
  let mohsHardness = req.body.mohsHardness;
  let density = req.body.density;
  let img = req.body.img;

  let stone = await Rock.findOne(
      { name: name }
  );
  if (stone) {
      res.send({ error: "Error: This stone is already in the app " + name });
  }
  else {
    stone = new Rock({
          name: name,
          type: type,
          description: description,
          price: price,
          mooseHardness: mohsHardness,
          density: density,
          img: img
      });
      await stone.save();
      res.send(stone);
  }
});

api.post("/rocks/delete", async (req, res) => {

  let rockId = req.body.rockId;

  let rock = await Rock.deleteOne(
      { _id: mongoose.Types.ObjectId(rockId) }
  );
  res.send(rock);
});

export default api;
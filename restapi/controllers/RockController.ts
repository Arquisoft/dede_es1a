import express, { Request, Response, Router } from 'express';
const Rock = require("../models/Rock");

const mongoose = require("mongoose");

export const findRocks = async (req:Request, res:Response) => {
    const rocks = await Rock.find({})
    res.send(rocks).json();
};

export const addRock = async (req:Request, res:Response): Promise<any> => { 

  
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
};

export const deleteRock = async (req:Request, res:Response): Promise<any> => {
  
    let rockId = req.body.rockId;
  
    let rock = await Rock.deleteOne(
        { _id: mongoose.Types.ObjectId(rockId) }
    );
    res.send(rock);
};
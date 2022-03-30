import express, { Request, Response, Router } from 'express';
const Rock = require("../models/Rock");

const mongoose = require("mongoose");

export const findRocks = async (req:Request, res:Response) => {
    const rocks = await Rock.find({})
    res.send(rocks).json();
};

export const findRocksSedimentary = async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "sedimentaria"})
    res.send(rocks).json();
};

export const findRocksFiery= async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "ígnea"})
    res.send(rocks).json();
};

export const findRocksMetamorphic = async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "metamórfica"})
    res.send(rocks).json();
};

export const addRock = async (req:Request, res:Response): Promise<any> => { 

    let rockId = req.body.rockId;
    let name = req.body.name;
    let type = req.body.type;
    let description = req.body.description;
    let price = req.body.price;
    let mohsHardness = req.body.mohsHardness;
    let density = req.body.density;
    let texture = req.body.texture;
    let img = req.body.img;
  
    let rock = await Rock.findOne(
        { name: name }
    );
    if (rock) {
        res.send({ error: "Error: This rock is already in the app " + name });
    }
    else {
      rock = new Rock({
            rockId: rockId,
            name: name,
            type: type,
            description: description,
            price: price,
            mohsHardness: mohsHardness,
            density: density,
            texture: texture,
            img: img
        });
        await rock.save();
        res.send(rock);
    }
};

export const deleteRock = async (req:Request, res:Response): Promise<any> => {
  
    let rockId = req.body.rockId;
  
    let rock = await Rock.deleteOne(
        { _id: mongoose.Types.ObjectId(rockId) }
    );
    res.send(rock);
};
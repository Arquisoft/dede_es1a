import express, { Request, Response, Router } from 'express';
const Rock = require("../models/Rock");

const mongoose = require("mongoose");

export const findRocks = async (req:Request, res:Response) => {
    const rocks = await Rock.find({})
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);

};

export const findRocksSedimentary = async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "sedimentaria"})
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);
};

export const findRocksFiery= async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "ígnea"})
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);
};

export const findRocksMetamorphic = async (req:Request, res:Response) => {
    const rocks = await Rock.find({type : "metamórfica"})
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);
};

export const findByCritery = async (req:Request, res:Response) => {
    let critery = {
        mohs:
        {
            $gt:req.params.mohsMin,
            $lt:req.params.mohsMax
        },
        density:
        {
            $gt:req.params.densityMin,
            $lt:req.params.densityMax
        },
        price:
        {
            $gt:req.params.priceMin,
            $lt:req.params.priceMax
        },
        name:
        {
            $regex:req.params.nameSubString
        }
    };

    const rocks = await Rock.find(critery)
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);
}


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
        res.status(401);
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
        res.status(200);
        res.send(rock);
    }
};

export const deleteRock = async (req:Request, res:Response): Promise<any> => {
  
    let query = {rockId : req.body.rockId.toString()};
    let rock = await Rock.deleteOne(
        {query}
    );
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rock);
   
};
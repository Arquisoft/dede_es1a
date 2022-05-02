import express, { json, Request, Response, Router } from 'express';
import { stringify } from 'querystring';
const Rock = require("../models/Rock");

const mongoose = require("mongoose");

export const findRocks = async (req:Request, res:Response) => {
    const rocks = await Rock.find({})
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(rocks);

};

export const findRocksById = async (req:Request, res:Response) => {
    let rockId = req.params.rockId
    const rocks = await Rock.find({rockId : rockId.toString()})
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
    
    let name=req.query.nameSubString;
    name=name?.toString().trimEnd().trimStart()
    let nameRegEx;
    if(name!==undefined)
        nameRegEx=new RegExp(name, "gi");
    let critery = {
        mohsHardness:
        {
            $gt:req.query.mohsMin,
            $lt:req.query.mohsMax
        },
        density:
        {
            $gt:req.query.densityMin,
            $lt:req.query.densityMax
        },
        price:
        {
            $gt:req.query.priceMin,
            $lt:req.query.priceMax
        },
        name:
        {
            $regex:nameRegEx
        },
        type:
        {
            $regex:req.query.type
        }
    };
    var rocks
    try {
        rocks = await Rock.find(critery)
    } catch (error) {
        console.log(error)
        console.log("Values:"
        +"\n\tmohsMin: "+req.query.mohsMin
        +"\n\tmohsMax: "+req.query.mohsMax
        +"\n\tdensityMin: "+req.query.densityMin
        +"\n\tpriceMin: "+req.query.priceMin
        +"\n\tpriceMax: "+req.query.priceMax
        +"\n\tnameSubString: "+req.query.nameSubString)
    }
    
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
    
    let query = {name: name.toString()}
    let rock = await Rock.findOne(query);
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
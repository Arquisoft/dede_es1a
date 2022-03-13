import express, { Request, Response, Router } from 'express';
const User = require("../models/User");

const mongoose = require("mongoose");

export const findUsers = async (req:Request, res:Response) => {
    const users = await User.find({})
    res.send(users);
};
  
export const addUser = async (req:Request, res:Response): Promise<any> => { 
  
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
  };
  
export const deleteUser = async (req:Request, res:Response): Promise<any> => {
  
    let email = req.body.email;
  
    let user = await User.deleteOne(
        { email: email }
    );
    res.send(user);
  };
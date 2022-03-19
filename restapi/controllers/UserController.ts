import express, { Request, Response, Router } from 'express';
const User = require("../models/User");

const mongoose = require("mongoose");

export const findUsers = async (req:Request, res:Response) => {
    const users = await User.find({})
    res.send(users).json();
};
  
export const addUser = async (req:Request, res:Response): Promise<any> => { 
    
    let dni = req.body.dni;
    let name = req.body.name;
    let email = req.body.email;
    let rol = 1;
    let password = req.body.password;
  
    let user = await User.findOne(
        { email: email }
    );
    if (user) {
        res.send({ error: "Error: This user is already registered " + email });
    }
    else {
        user = new User({
            dni: dni,
            name: name,
            email: email,
            rol: rol,
            password: password
        });
        await user.save();
        res.send(user);
    }
  };
  
export const deleteUser = async (req:Request, res:Response): Promise<any> => {
  
    let dni = req.body.dni;
  
    let user = await User.deleteOne(
        { dni: dni }
    );
    res.send(user);
  };
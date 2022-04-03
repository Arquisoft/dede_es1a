import express, { Request, Response, Router } from 'express';
const User = require("../models/User");

const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

export const findUsers = async (req:Request, res:Response) => {
    const users = await User.find({});
    res.status(200);
    res.send(users).json();
};
  
export const addUser = async (req:Request, res:Response): Promise<any> => { 
    
    req.body.password = await crypto.createHmac('sha256', "abcdefg")
    .update(req.body.password).digest('hex');

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
        res.status(200);
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


export const loginUser = async (req:Request, res:Response): Promise<any> => {

    let email = req.body.email;
    let password = await crypto.createHmac('sha256', "abcdefg")
    .update(req.body.password).digest('hex');
    
    let user = await User.findOne(
        {email: email,
        password: password
        }
    );

    if (user == null){
        res.status(401);
        res.json({
            errores : ["Email o contraseña incorrectos"],
            autenticado : false
        });
    }
    else{
        req.session.usuario = email;
        req.session.rol = user.rol;
        let token = jwt.sign(
            {usuario: email , tiempo: Date.now()/1000}, "secreto");
        res.status(200);
        res.json({
            autenticado: true,
            token : token
        });
    }
}

export const logout = async (req:Request, res:Response): Promise<any> => {
    req.session.usuario  = null;
    req.session.rol = null;
    res.send("Usuario Desconectado");
}
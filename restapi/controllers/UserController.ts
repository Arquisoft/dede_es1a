import express, { Request, Response, Router } from 'express';
const User = require("../models/User");

const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

export const findUsers = async (req: Request, res: Response) => {
    const users = await User.find({});
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(users);
};

export const addUser = async (req: Request, res: Response): Promise<any> => {
    let toComparePass = req.body.password;
    req.body.password = await crypto.createHmac('sha256', "abcdefg")
        .update(req.body.password).digest('hex');

    let dni = req.body.dni;
    let name = req.body.name;
    let email = req.body.email;
    let rol = 1;
    let password = req.body.password;
    let repeatPassword = req.body.repeatPassword;

    let errors = validateUser(dni, name, email, toComparePass, repeatPassword);
    if (errors.length != 0) {
        res.status(401);
        res.send(errors);
    }
    else {
        let query = {email: email}
        let user = await User.find(query);
        if (user[0]) {
            res.status(401);
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
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {


    let query = {dni : req.body.dni.toString()};
    let user = await User.deleteOne(
        { query }
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(user);
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {

    let email = req.body.email;
    let password = await crypto.createHmac('sha256', "abcdefg")
        .update(req.body.password).digest('hex');

    let user = await User.findOne(
        {
            email: email,
            password: password
        }
    );

    if (user == null) {
        res.status(401);
        res.json({
            errores: ["Email o contraseña incorrectos"],
            autenticado: false
        });
    }
    else {
        req.session.usuario = email;
        req.session.rol = user.rol;
        let token = jwt.sign(
            { usuario: email, tiempo: Date.now() / 1000 }, "secreto");
        res.status(200);
        res.json({
            autenticado: true,
            token: token
        });
    }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    req.session.usuario = null;
    req.session.rol = null;
    res.send("Usuario Desconectado");
}

function validateUser(dni: string | any[], name: string | any[], email: string | any[], password: string | any[], repeatPassword: string | any[]) {
    let errors = new Array();
    if (dni.length == 0) {
        errors.push("Error: El campo dni no puede ser vacio");
    }

    if (name.length == 0) {
        errors.push("Error: El campo nombre no puede ser vacio");
    }

    if (email.length == 0) {
        errors.push("Error: El campo email no puede ser vacio");
    }

    if (password.length == 0) {
        errors.push("Error: El campo password no puede ser vacio");
    }

    if (repeatPassword.length == 0) {
        errors.push("Error: El campo repeatPassword no puede ser vacio");
    }

    if (repeatPassword != password) {
        errors.push("Error: El campo password y repeatPassword deben ser iguales");
    }

    return errors;
}
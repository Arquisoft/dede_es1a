import express, { Request, Response, Router } from 'express';
const Order = require("../models/Order");

export const findOrdersByUserDni = async (req:Request, res:Response) => {
    let dni = req.body.dni;
    const users = await Order.find({userDni : dni})
    res.send(users).json();
};

export const addOrder = async (req:Request, res:Response): Promise<any> => { 

    let orderId = Math.floor(Math.random() * (999999 + 1));
    let order = await Order.findOne(
        { orderId: orderId });
    while(order){
        orderId = Math.floor(Math.random() * (999999 + 1));
        order = await Order.findOne(
        { orderId: orderId });
    }

    let userDni = req.body.dni;
    let price = req.body.price;
    let products = req.body.products;

    order = new Order({
        dni: userDni,
        price: price,
        products: products
    });
    await order.save();
    res.send(order);
    
  };
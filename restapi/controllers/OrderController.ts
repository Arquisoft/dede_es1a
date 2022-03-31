import express, { Request, Response, Router } from 'express';
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);
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


  export const getDeliveryCosts = async (req:Request, res:Response) : Promise<any> =>{ 
    
    let address = req.body.address;
    let deliveryCosts = 0;
    const addressCordinates = await geocoder.geocode(address);

    let string = JSON.stringify(addressCordinates);
    let objectValue = JSON.parse(string);

    let latitudeAddress = objectValue[0].latitude
    let longitudeAddress = objectValue[0].longitude

    let latitudeOrigin = 43.364029479589455;
    let longitudeOrigin = -5.851265656091869;

    let R = 6371;
    let distanceLatitude = toRadians(latitudeAddress-latitudeOrigin);
    let distanceLongitude = toRadians(longitudeAddress-longitudeOrigin);
    let lat1 = toRadians(latitudeOrigin);
    let lat2 = toRadians(latitudeAddress);

    let a = Math.sin(distanceLatitude/2) * Math.sin(distanceLatitude/2) +
        Math.sin(distanceLongitude/2) * Math.sin(distanceLongitude/2) * Math.cos(lat1) * Math.cos(lat2); 

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let distance = R * c;

    deliveryCosts = Number.parseFloat((distance * 0.5).toFixed(2));

    res.send(deliveryCosts.toString());
  }

  function toRadians(value: number) 
    {
        return value * Math.PI / 180;
    }

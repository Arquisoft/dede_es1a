import express, { Request, Response, Router } from 'express';
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);
const Order = require("../models/Order");


export const findOrdersByUserEmail = async (req:Request, res:Response) => {
    let userEmail = req.body.userEmail;
    let query = {userEmail : userEmail.toString()};
    const users = await Order.find(query)
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(users);
};


export const addOrder = async (req:Request, res:Response): Promise<any> => { 
    const crypto = require('crypto');
    const orderId = crypto.randomBytes(60);

    let userEmail = req.body.userEmail;
    let price = req.body.price;
    let productId = req.body.productId;

    let order = new Order({
        orderId: orderId,
        userEmail: userEmail,
        price: price,
        productId: productId
    });
    await order.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(order);
    
  };


  export const getDeliveryCosts = async (req:Request, res:Response) : Promise<any> =>{ 

    let address = req.body.address;
    let deliveryCosts = 0;
    const addressCordinates = await geocoder.geocode(address);

    let string = JSON.stringify(addressCordinates);
    let objectValue = JSON.parse(string);
    console.log(addressCordinates);
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

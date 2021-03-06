import express, { Request, Response, Router } from 'express';
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);
const Order = require("../models/Order");
const Rock = require("../models/Rock");


export const findOrdersByUserEmail = async (req:Request, res:Response) => {
    let userEmail = req.params.userEmail;
    if(userEmail){
      let query = {userEmail : userEmail.toString()};
      const users = await Order.find(query)
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(users);
    }else{
      res.status(401);
    }

};


export const addOrder = async (req:Request, res:Response): Promise<any> => { 
    const crypto = require('crypto');
    const orderId = crypto.randomBytes(60);

    let userEmail = req.body.userEmail;
    let price = req.body.price;
    let productId = req.body.productId;
    let date = Date.now();
    let productName = req.body.productName;
    let productType = req.body.productType;

    let order = new Order({
        orderId: orderId,
        userEmail: userEmail,
        price: price,
        productId: productId,
        date: date,
        productName : productName,
        productType : productType
    });
    await order.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(order);
    
  };

  export const getBestSeller = async (req:Request, res:Response): Promise<any> => {

    const order = await Order.distinct("productName");

    let num = 0;
    let aux;
    let aux2;

    for (let i =0; i < order.length; i++){
      aux= await Order.find({productName :order[i]});
      if (aux.length > num){
        num = aux.length;
        aux2 = aux[0].productName;
      }
    }

    let bestSeller = await Rock.find({name: aux2});
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(bestSeller);
  
  }

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

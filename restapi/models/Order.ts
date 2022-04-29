const Rock = require("./Rock");
const mongooseOrders = require("mongoose")


const orderSchema = mongooseOrders.Schema({
    orderId : String,
    price : Number,
    userEmail : String,
    productId : String,
    date : Date,
    productName : String,
    productType : String
},{
    versionKey: false
}
)


module.exports = mongooseOrders.model("Orders", orderSchema)
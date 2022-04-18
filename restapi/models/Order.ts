const Rock = require("./Rock");
const mongooseOrders = require("mongoose")


const orderSchema = mongooseOrders.Schema({
    orderId : String,
    price : Number,
    userEmail : String,
    productId : String
},{
    versionKey: false
}
)


module.exports = mongooseOrders.model("Orders", orderSchema)
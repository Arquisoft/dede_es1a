const Rock = require("./Rock");
const mongooseOrders = require("mongoose")


const orderSchema = mongooseOrders.Schema({
    orderId : String,
    price : Number,
    userDni : String,
    products : Rock
},{
    versionKey: false
}
)


module.exports = mongooseOrders.model("Orders", orderSchema)
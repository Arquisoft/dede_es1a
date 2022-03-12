const mongooseRocks = require("mongoose")


const stoneSchema = mongooseRocks.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    mohsHardness:Number,
    density:Number,
    img: String
},{
    versionKey: false
}
)


module.exports = mongooseRocks.model("Rocks", stoneSchema)
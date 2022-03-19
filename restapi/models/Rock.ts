const mongooseRocks = require("mongoose")


const rockSchema = mongooseRocks.Schema({
    rockId:String,
    name: String,
    type: String,
    description: String,
    price: Number,
    mohsHardness:Number,
    density:Number,
    texture:String,
    img: String
},{
    versionKey: false
}
)


module.exports = mongooseRocks.model("Rocks", rockSchema)
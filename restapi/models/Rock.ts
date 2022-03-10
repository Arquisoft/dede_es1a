const mongooseRocks = require("mongoose")


const stoneSchema = mongooseRocks.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    mooseHardness:Number,
    density:Number,
    texture:String
},{
    versionKey: false
}
)


module.exports = mongooseRocks.model("Rocks", stoneSchema)
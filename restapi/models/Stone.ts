const mongooseStones = require("mongoose")


const stoneSchema = mongooseStones.Schema({
    name: String,
    type: String,
    description: String,
    price: Number
},{
    versionKey: false
}
)


module.exports = mongooseStones.model("Stones", stoneSchema)
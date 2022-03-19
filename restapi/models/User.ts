const mongooseUsers = require("mongoose")


const userSchema = mongooseUsers.Schema({
    dni: String,
    name: String,
    email: String,
    rol: Number,
    password: String
},{
    versionKey: false
}
)


module.exports = mongooseUsers.model("Users", userSchema)
const mongooseUsers = require("mongoose")


const userSchema = mongooseUsers.Schema({
    name: String,
    email: String
},{
    versionKey: false
}
)


module.exports = mongooseUsers.model("Users", userSchema)
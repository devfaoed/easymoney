const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");




const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    username: String,
    email: String,
    password: String,
    bvn: String,
    pacctN: String,
    bankname: String,
    sex: String,
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;





var PassportLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    passport: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false}
});

// this code will add a lot of functions to our userSchema
userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
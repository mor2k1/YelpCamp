var PassportLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    passport: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// this code will add a lot of functions to our userSchema
userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
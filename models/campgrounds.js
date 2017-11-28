var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
        },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
    
});

//compile into a model variable
module.exports = mongoose.model("Campground", campgroundSchema);
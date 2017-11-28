var middlewareObj = {};
var Comment = require("../models/comments");
var Campground = require("../models/campgrounds");

middlewareObj.checkCampgroundOwenership = function checkCampgroundOwenership(req, res, next){
        if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err || !foundCamp){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                //does the user own the campground?
                // SO FIRST - A COMMON WRONG : 
                // both will look the same but not equal. 
                // console.log(foundCamp.author.id); - mongoose Object 
                // console.log(req.user._id); - String
                // if(foundCamp.author.id === req.user._id)
                // so we need to use a method that mongoose give us - .equals()
                if(foundCamp.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });   
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login");
    }
};



middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
        if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });   
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};



middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("warning", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj
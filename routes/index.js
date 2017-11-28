var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
   res.render("HomePage"); 
});

// AUTH ROUTES

router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    }
    // we can use this line down below to make things to look more nice: User.register (newUser, pass, CB(err, user))
    // var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password , function(err, user) {
        if(err){
            console.log("error " + err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        //this line will log in the user after he authenticated and redirect him to campgrounds
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + req.body.username + "!");
            res.redirect("campgrounds");
        });
    });
});

// LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login");
});
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

//LOGOUT ROUTES
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
    console.log("logged out..");
});

module.exports = router;
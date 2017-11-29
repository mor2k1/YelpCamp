// User Associations: campground - writing the name of the user who submitted the image. 

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    PassportLocalMongoose = require("passport-local-mongoose"),
    Campground = require("./models/campgrounds"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    Comment = require("./models/comments"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    require('dotenv').config(); 
    
var commentsRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
 
  
// seedDB();

mongoose.Promise = global.Promise; // for an error message in the terminal. 


// mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true}); 
// export DATABASEURL=mongodb://localhost/yelp_camp_v12  - in the terminal.
//we need to set up the enviorment variable on heroku.
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
mongoose.connect(url, {useMongoClient: true});
// mongoose.connect("mongodb://mor:3122pass@ds123146.mlab.com:23146/yelp_camp_mor", {useMongoClient: true}); 


// here we create a DB called yelp_camp.

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// Now moment is available for use in all of your view files via the variable named moment

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Yuval Mor",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//the name of currentUser is created in app.get("/campgrounds") route. 
app.use(function(req, res, next){
    //req.user will return empty if no one is sign in, and if someone is signed in will return username and the ID of the current user
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.warning = req.flash("warning");
   next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp running.. ");
});
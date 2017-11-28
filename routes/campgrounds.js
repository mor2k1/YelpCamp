var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var middleware = require("../middleware"); //it automaticly will look for index.js


//USER EDIT AND PERSONAL THINGS
router.get("/userEdit/:id", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("/");
       }
    res.render("editUserPage", {username: req.user, user: foundUser});
    });
});

router.get("/messages", middleware.isLoggedIn, function(req, res){
    res.render("message");
});

router.get("/contact", middleware.isLoggedIn, function(req, res){
    res.render("contact");
});



// INDEX - Display a list of all campgrounds
router.get("/campgrounds", function(req, res){
    var noMatch = null;
    if(req.query.search){ 
    // if someone searched something so run this : 
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds){ //by {}, we take all inside the campground db. 
            if(err){
                console.log("error: " + err);
            }else{
                if(allCampgrounds.length < 1){
                    noMatch = "No campground match that query, please try again.";
                }
                //if there is no error all the campgrounds from the DB will sent to the campgrounds.ejs file. 
                res.render("campground/index", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: noMatch});
            }
        });
    }else{
        // get all campground from DB 
        Campground.find({}, function(err, allCampgrounds){ //by {}, we take all inside the campground db. 
            if(err){
                console.log("error: " + err);
            }else{
                //if there is no error all the campgrounds from the DB will sent to the campgrounds.ejs file. 
                res.render("campground/index", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: noMatch});
            }
        });
    }
});


//CREATE -  Add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
// the post using the same route as the get. we can do that and we dont need to change
// the name of the route. get and post are two different thigns. 

   //get data from form and add it to campgrounds array (with body-parser).
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   
   //combine the data to an object.
   var newCampground = {name: name, price: price, img: image, description: desc, author: author};
   
   //create a new campground and save to DB 
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log("error: " + err);
       }else{
           //redircet back to campgrounds route. this redirect to the app.get("/campgrounds").
           req.flash("success", "Campground Created!");
           res.redirect("/campgrounds");
       }
   });
});

//a form that allows us to make a new campground with an image. 
//NEW - Displays form to make a new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render("campground/new"); 
});


// SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID - we using mongoose method FindById. 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("error: " + err);
        }else{
            //render show template with that campground
            console.log(foundCampground);
            res.render("campground/show", {campground: foundCampground});            
        }
    });
});


//EDIT CAMPGROUDN ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwenership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campground/edit", {camp: foundCamp});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwenership, function(req, res){
//   Blog.findByIdAndUpdate(id, newData, call back) the new data is like we called it in the form. 
  Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, Updated){
      if(err){
          res.redirect("/campgrounds");
      } else {
          req.flash("success", "Campground edited successfully!");
          res.redirect("/campgrounds/" + req.params.id);
      }
  }) 
});

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwenership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
   if(err){
       res.redirect("/campgrounds");
   } else {
       req.flash("error", "Campground Deleted!");
       res.redirect("/campgrounds");
       console.log("campground deleted");
   }
});
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
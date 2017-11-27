var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware"); //it automaticly will look for index.js

//NESTED ROUTES - COMMENTS

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,  function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
    
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
   //lookup campground using id
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save the comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Successfully added comment");
                   res.redirect('/campgrounds/' + campground._id);
                   
               }
           });
       }
   });
   //create a new comment
   //connect ne wcomment to campground
   //redirect to ampground show page
});

//EDIT A COMMENT
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find by id and update take 3 things:
    //the id to defined by, the data to update and a callback
    Campground.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated_comment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "You edited the comment successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("error", "Comment Deleted!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});


module.exports = router;
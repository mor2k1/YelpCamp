var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
// array of started data
var data = [
        {
        name: "Hill Rocks",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/06/40/73/68/conesus-lake-campgrounds.jpg",
        description: "Bacon ipsum dolor amet rump tail strip steak tenderloin pork ham frankfurter ball tip. Turkey spare ribs corned beef, kielbasa beef t-bone doner. Ham hock shankle short ribs, pork chuck corned beef bresaola frankfurter brisket beef biltong tri-tip doner porchetta pork chop. Strip steak porchetta ribeye short loin turducken, kevin meatball landjaeger chicken.",
        author: {id:'59c954010e420c4bce9bbcd4'}
    },
        {
        name: "Desert Messa",
        img: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf",
        description: "Bacon ipsum dolor amet rump tail strip steak tenderloin pork ham frankfurter ball tip. Turkey spare ribs corned beef, kielbasa beef t-bone doner. Ham hock shankle short ribs, pork chuck corned beef bresaola frankfurter brisket beef biltong tri-tip doner porchetta pork chop. Strip steak porchetta ribeye short loin turducken, kevin meatball landjaeger chicken.",
        author: {id:'59c954010e420c4bce9bbcd4'}
    },
        {
        name: "Canyon Floor",
        img: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description: "Bacon ipsum dolor amet rump tail strip steak tenderloin pork ham frankfurter ball tip. Turkey spare ribs corned beef, kielbasa beef t-bone doner. Ham hock shankle short ribs, pork chuck corned beef bresaola frankfurter brisket beef biltong tri-tip doner porchetta pork chop. Strip steak porchetta ribeye short loin turducken, kevin meatball landjaeger chicken.",
        author: {id:'59c954010e420c4bce9bbcd4'}
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("The index removed from the Website");
    });
    //Add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log("error: " + err);
            }else{
                console.log("Campground added successfuly");
                //create a comment to each campground
                // Comment.create({
                //         text: "This place is great!",
                //         author: "Yuval Mor"
                // }, function(err, comment){
                //     if(err){
                //         console.log(err);
                //     }else{
                //         campground.comments.push(comment);
                //         campground.save();
                //         console.log("created a new comment.");
                //     }
                // }
                // )
            }
        });
    });
};

module.exports = seedDB;
// this will send the function to seedDB variable and when we use seedDB() it will execute the function.

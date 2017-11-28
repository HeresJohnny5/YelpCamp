var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Kratos' Sanctuary",
        image: "https://images.unsplash.com/photo-1437422061949-f6efbde0a471?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Awesome resort town with great Bed and Breakfast options"
    },
    {
        name: "Nachos Rest",
        image: "https://images.unsplash.com/photo-1442850473887-0fb77cd0b337?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Wonderful place to stay if you're looking for peace and quiet"
    },
    {
        name: "Flash's Home Cooking",
        image: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Come one, come all for good home cooked meals"
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("Removed Campgrounds!");
        
        // Add few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added a Campground!");
                    // Create a comment on each Campground
                    Comment.create(
                        {
                            text: "This place is great, I love it!",
                            author: "Billy Bob"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new Comment!");
                            }
                        }
                    );
                }
            });   
        });
    });
}

module.exports = seedDB;
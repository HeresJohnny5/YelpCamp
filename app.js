var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// this will create the yelp_camp database dynamically

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create(
  {
    name: "Mount Hood", 
    image: "https://images.unsplash.com/photo-1431512284068-4c4002298068?w=2552&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "This place is awesome. They filmed the outside of the shining at the hotel. On a good day you can see the Three Sisters."
  }, function(err, campground) {
      if(err) {
        console.log(err);
      } else {
        console.log("Campground got saved to DB");
        console.log(campground);
      }
  });

app.get('/', function(req, res) {
  res.render('landing');
});

// INDEX Route - Show all campgrounds
app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
        res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

// CREATE Route - Add new campground to DB
app.post('/campgrounds', function(req, res) {
  var campground = req.body.campground;
  var image = req.body.image;
  var newCampground = { name: campground, image: image };
  
  // campgrounds.push(newCampground);
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
        res.redirect('campgrounds');
    }
  });
});

// CREATE - Show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new');
});

// SHOW - Show info. about one specific campground
app.get('/campgrounds/:id', function(req, res) {
  res.send("Awesome");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started!");
});
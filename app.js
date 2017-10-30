var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// this will create the yelp_camp database dynamically

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
        res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

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

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.listen(3000, function () {
  console.log("YelpCamp server has started!");
});
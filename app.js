var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Campground = require('./models/campground'),
      Comment = require('./models/comment'),
      seedDB = require('./seeds');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// this will create the yelp_camp database dynamically

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

seedDB();

app.get('/', function(req, res) {
  res.render('landing');
});

// INDEX Route - Show all campgrounds
app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
        res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

// NEW - Show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new');
});

// CREATE Route - Add new campground to DB
app.post('/campgrounds', function(req, res) {
  var campground = req.body.campground;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: campground, image: image, description: description };
  
  // campgrounds.push(newCampground);
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
        res.redirect('campgrounds');
    }
  });
});

// SHOW - Show info. about one specific campground
app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if(err) {
      console.log('Error');
    } else {
        res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

// COMMENT/NEW - Dependent on SHOW 
app.get('/campgrounds/:id/comments/new', function(req, res) {
  var id = req.params.id;
  
  Campground.findById(id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground }); 
    }
  });
    
});

// COMMENT/POST - Dependent on SHOW
app.post('/campgrounds/:id/comments', function(req, res) {
  var newComment = req.body.comment;
  var id = req.params.id;
  
  Campground.findById(id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(newComment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + id);
        }
      });
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started!");
});
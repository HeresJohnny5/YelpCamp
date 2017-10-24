const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	var campgrounds = [
		{ name: "Crater Lake", image: "https://images.unsplash.com/photo-1437422061949-f6efbde0a471?w=2550&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" },
		{ name: "Mount Hood", image: "https://images.unsplash.com/photo-1431512284068-4c4002298068?w=2552&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" },
		{ name: "Three Sisters", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2550&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" }
	];
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(3000, function () {
  console.log("YelpCamp server has started!")
});
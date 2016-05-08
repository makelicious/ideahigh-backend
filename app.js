var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// database settings
var db = require('./lib/db');
// routes
var thoughts = require('./routes/thoughts');
var users = require('./routes/users');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/thoughts', thoughts);
app.use('/users', users);

app.get('/', function(req, res) {
  res.render('index',{
    title: 'Chronomonology' });
});

app.listen(3000, function() {
  console.log('Listening on port 3000');

});


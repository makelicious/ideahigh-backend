var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// database settings
var mongo = require('mongodb');
var monk = require('monk');
var db = require('monk')(process.env.MONGODB_URI || 'localhost:27017/proto');

// routes
var thoughts = require('./routes/thoughts');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/:board/thoughts', thoughts);

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

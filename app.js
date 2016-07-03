var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// database
var getDatabase = require('./database');

// routes
var thoughts = require('./routes/thoughts');

const port = process.env.PORT || 4000;

function createApp(database) {
  var app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(function(req, res, next) {
    req.db = database;
    next();
  });

  app.use('/:board/thoughts', thoughts);

  return app;
}

getDatabase((err, database) => {
  if(err) {
    console.error(err);
    return;
  }

  createApp(database).listen(port, function() {
    console.log('Listening on port', port);
  });
});

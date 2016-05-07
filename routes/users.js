var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var mongo = require('mongodb');
var monk = require('monk');
var db = require('monk')('localhost:27017/proto');

router.route('/signup')
  .get(function (req, res) {
    res.render('signup', {
      title: 'signup'
    });
  });

  router.route('/register')
    .post(function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.insert(req.body, function(err, docs) {
      res.send(docs);
    });
  });
router.route('/login')
  .get(function(req, res) {
    res.render('login', {
      title: 'login'
    });
  });

module.exports = router;

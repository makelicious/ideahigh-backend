var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// list of every thoughts
router.route('/.json/')
  .get(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    collection.find({},{}, function(e, docs) {
      console.log(docs);
      res.json(docs);
    });
  })
  .post(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    collection.insert(req.body, function(err, docs){
      res.status(201).send(docs);
    });
  });



// list of every hashtags
router.route('/hashtags.json')
  .get(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    collection.distinct("hashtags", function(e, docs) {
      var allHashtags = docs;
      allHashtags.sort();
      res.json(allHashtags);
    });
  });

router.route('/')
  .get(function(req, res) {
    res.render('hashtaglist', {
      title: 'List of hashtags'
    });
  });

// list of every thought under specific hashtag
router.route('/:hashtags.json')
  .get(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    var currentHashtagBranch = req.params.hashtags;
    collection.find({"hashtags": currentHashtagBranch}, function(e, docs) {
      console.log(docs);
      res.json(docs);
    });
  });

router.route('/:hashtags')
  .get(function(req, res) {
    res.render('thoughts', {
      title: 'yeah'
    });
  });

// list of associated hashtags of a current hashtag
router.route('/:hashtags/associatedhashtags.json')
  .get(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    var currentHashtagBranch = req.params.hashtags;
    collection.find({"hashtags": currentHashtagBranch}, function(e, docs) {
       var thoughts = docs;
       var allHashtags = thoughts.map(function(thought) {
        return thought.hashtags;
       });
       var allHashtagsFlattened = allHashtags.reduce(function(hashtag, thought) {
        return hashtag.concat(thought);
       }, []);

       var associatedHashtags = [];

       allHashtagsFlattened.forEach(function(hashtag) {
        if(hashtag !== currentHashtagBranch && associatedHashtags.indexOf(hashtag) === -1) {
          associatedHashtags.push(hashtag);
          return hashtag;
        }
       });

      associatedHashtags.sort();
      res.json(associatedHashtags);
    });
  });

router.route('/deletethought/:id')
  .delete(function(req, res) {
    var db = req.db;
    var collection = db.get('thoughts');
    var userToDelete = req.params.id;
      collection.remove({ '_id': userToDelete });
  });










module.exports = router;

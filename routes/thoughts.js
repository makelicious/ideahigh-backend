var express = require('express');
var router = express.Router({mergeParams: true});

router.route('/')
.get(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.get('thoughts-' + board);
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
})
.post(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.get('thoughts-' + board);
  collection.insert(req.body, function(err, docs) {
    res.status(201).send(req.body);
  });
});

router.route('/:thought_id').put(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.get('thoughts-' + board);
  collection.update({ id: req.params.thought_id }, req.body, function(err, docs) {
    res.status(201).send(req.body);
  });
});

module.exports = router;

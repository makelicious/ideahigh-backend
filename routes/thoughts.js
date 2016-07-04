var express = require('express');
var router = express.Router({mergeParams: true});
var _ = require('lodash');

router.route('/')
.get(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var search = req.params.search || '';
  var collection = db.collection('thoughts-' + board);
  collection.find({ "text": { $regex: search }).toArray(function(err, docs) {
    res.json(docs);
  });
})
.post(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.collection('thoughts-' + board);
  collection.insert(req.body, function(err, docs) {
    res.status(201).send(req.body);
  });
});

router.route('/:thought_id').put(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.collection('thoughts-' + board);
  var newData = _.omit(req.body, '_id');

  collection.update({
    id: req.params.thought_id
  }, newData, function(err, docs) {
    res.status(200).send(req.body);
  });
})
.delete(function(req, res) {
  var db = req.db;

  var collection = db.collection('thoughts-' + req.params.board);

  collection.remove({
    id: req.params.thought_id
  }, function(err, docs) {
    res.status(200).end();
  });
});

module.exports = router;

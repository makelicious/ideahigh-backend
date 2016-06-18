var express = require('express');
var router = express.Router({mergeParams: true});
var _ = require('lodash');

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

router.route('/:thought_id')
.put(function(req, res) {
  var db = req.db;
  var board = req.params.board;
  var collection = db.get('thoughts-' + board);
  var newData = _.omit(req.body, '_id');

  collection.update({
    id: parseInt(req.params.thought_id, 10)
  }, newData, function(err, docs) {
    res.status(201).send(req.body);
  });
})
.delete(function(req, res) {
  var db = req.db;

  var collection = db.get('thoughts-' + req.params.board);

  collection.remove({
    id: parseInt(req.params.thought_id, 10)
  }, function(err, docs) {
    res.status(200).end();
  });
});

module.exports = router;

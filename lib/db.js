var monk = require('monk');
var db = require('monk')('localhost:27017/proto');

module.exports = db;

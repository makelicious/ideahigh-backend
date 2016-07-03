var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/proto';

module.exports = function getDatabase(callback) {
  return MongoClient.connect(url, callback);
}

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://dcm:dcm@192.168.116.135:27017/dcm';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db,function(result){
      findDocuments(db,function(result){
  	   
      db.close();
    });
      
  });
  
 
});
var findDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('file');
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null); 
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}

var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('file');
  // Insert some documents 
  collection.insertMany([
    {name : 1,path:'123123'}, {name : 2,path:'sdfsdfsdf'}, {name : 3,path:'dfgdfg'}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

/* GET users listing. */
router.get('/dcm/mdb/insert', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

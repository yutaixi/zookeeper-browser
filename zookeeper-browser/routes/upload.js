exports.uploadFile = function(req, res) {
var express = require('express');
var multer  = require('multer') ;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

multer.upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading 
      return
    }
 
    // Everything went fine 
  })



};

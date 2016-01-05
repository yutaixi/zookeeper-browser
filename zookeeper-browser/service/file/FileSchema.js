var mongoose = require('mongoose');
var express = require('express'); 
  
 
var FileSchema = mongoose.Schema({
    name: String,
    path: String
});
 
module.exports =FileSchema;
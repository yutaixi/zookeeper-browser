var mongoose = require('mongoose');
var express = require('express'); 
  
 //定义文件表
var FileSchema = mongoose.Schema({
    name: String,
    path: String
});
 
module.exports =FileSchema;
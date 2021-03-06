var mongoose = require('mongoose');
var express = require('express');
var FileSchema=require('./FileSchema');
var config=require('../../config/config');
var router = express.Router();
//连接 
var url=config.mongodb_url;
//连接mongodb
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'+url));
db.once('open', function (callback) {
    console.log("Connected correctly to server:" + url);
});
 
var File = mongoose.model('file', FileSchema);

//保存
function save(data,callback) {
    var file = new File(data);
    file.save(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('saved OK!');
        }
    });
};
//创建
function create(data,callback) {
    // 增加记录 基于model操作 
    File.create(data, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('save ok');
        }
    });
};
//查找
function find(criteria,fields,options,callback){
    // mongoose find 
    File.find(criteria, fields, options,callback);
}; 


// 删除记录
function remove(data,callback,err){ 
    File.remove(data, function(error){
    if(error) {
        console.log(error);
        err(error);
    } else {
        console.log('delete ok!');
        callback();
    } 
    });
};

module.exports = { save: save, 
                   create: create,
                   find:find,
                   remove:remove
                 };
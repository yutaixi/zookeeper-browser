var express = require('express');

var mongodb_url = 'mongodb://dcm:dcm@192.168.116.135:27017/dcm';

var file_upload_path='./public/files';


module.exports ={
    mongodb_url:mongodb_url,
    file_upload_path:file_upload_path
};
var express = require('express');
var fs = require('fs');
var router = express.Router();
//引用FileDao
var fileDao = require('../service/file/fileDao');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, './public/files')
    },
    filename: function (req, file, cb) {
        console.log(file.fieldname);
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage, limits: { fieldSize: 100000000000 } });
//上传文件服务
router.post('/upload', upload.array('file', 20), function (req, res, next) {
    var files = req.files;
    console.log(files[0]);
    if (files) {
        for (var index = 0; index < (files.length || 1); index++) {
            fs.renameSync(files[index].path, files[index].destination + '/' + files[index].originalname);
            fileDao.save({ name: files[index].originalname, path: files[index].destination + '/' + files[index].originalname });
        }
    }

    res.send('111');
});
//查询文件服务
router.get('/find',function(req, res, next){
    // res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    fileDao.find(function(err,result){
        res.send(result);
    }); 
});


module.exports = router;

var express = require('express');
var Zookeeper = require('node-zookeeper-client');  
var path=require('path');
var upload=require('./upload'); 
var fs = require('fs');
var util = require('util');
var router = express.Router();
var ZkClient = require('../zk.js').ZkClient;
var zkHost = process.env.ZK_HOST || '192.168.116.135:2181';
var zk=new ZkClient(zkHost);
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dcm/index.html', { title: 'node test22' });
});
 /* GET home page. */
 router.get('/dcm', function(req, res, next) { 
     res.render('dcm/index.html', { title: 'node test22' });
});


//静态界面路由
router.get('/dcm/*.html', function(req, res, next) {
   var reqPath=req.path;
  reqPath=reqPath.substr(1); 
  res.render(reqPath, { title: 'node test22' });
});

 //rest服務
 //查询节点数据
 router.get('/dcm/zk/getData', function(req, res, next) { 
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});
     console.log("path to get data:"+(req.query.path || '/'));
    zk.client.getData(
    req.query.path || '/',
    function (event) {
        console.log('Got event: %s.', event);
    },
    function (error, data, stat) {
        if (error) {
            console.log(error.stack);
            return;
        }  
        res.send( {
        	 data:data?data.toString('utf8'):'',
        	'czxid':stat.czxid ,
        	'mzxid': stat.mzxid,
        	'ctime':stat.ctime ,
        	'mtime': stat.mtime,
        	'version': stat.version,
        	'cversion': stat.cversion ,
        	'aversion': stat.aversion ,
        	'ephemeralOwner': stat.ephemeralOwner ,
        	'dataLength':stat.dataLength,
        	'numChildren':stat.numChildren,
        	'pzxid':stat.pzxid }) ;

        console.log('Got data: %s',data?data.toString('utf8'):'');
    }
    );  
 
});
 //查询子节点
 router.get('/dcm/zk/getChildren', function(req, res, next) { 
     res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
     //如果没有传递父目录，则默认为根目录'/'
     var parenPath=req.query.id || '/';
    //开始查询子节点
    zk.client.getChildren(parenPath, function (error, children, stats) {
    if (error) {
        console.log(error.stack);
        return;
    } 
     var result=[];
            if(children.length !=0){
                children.forEach(function(child){
                    // realPath=path.join(parenPath,child);
                    if(parenPath.length>1)
                    {
                    	realPath=parenPath+'/'+child;
                    }else
                    {
                    	realPath='/'+child;
                    } 
                    result.unshift({
                        id:realPath, name:child, isParent:true, open:false, t:realPath
                    });
                });
            } 
       res.send(result); 
});
 
});


 

//更新节点数据服务
 router.post('/dcm/zk/setData', function(req, res, next) { 
 	 res.set({'Content-Type':'text/json','Encodeing':'utf8'});
	var path=req.body.path;
	var data=req.body.data;  
	var version=Number(req.body.version || -1); 
	console.log("setData path:"+path);
	console.log("setData data:"+data);
	console.log("setData version:"+version);
    zk.client.setData(path, new Buffer(data), version, function (error, stat) {
    if (error) {
        console.log(error.stack);
        res.send({data:'节点'+path+'更新失败'}); 
        return;
    }  
    console.log('Data is set.');
    res.send({data:'节点'+path+'更新成功'}); 
   });
   
    
});
 // 创建节点服务
 router.post('/dcm/zk/create', function(req, res, next) { 
 	 res.set({'Content-Type':'text/json','Encodeing':'utf8'});
	var parent=req.body.parent || '/';
	var name=req.body.name;
	var data=req.body.data;    
	console.log("parent path:"+parent);
	console.log("name:"+name); 
	console.log("data:"+data); 
    var path=parent=='/'?(parent+name):(parent+'/'+name);
	var msg='节点'+path+'创建成功';
    zk.client.create(path, new Buffer(data),function (error, path) {
    if (error) {
        if (error.getCode() ==  Zookeeper.Exception.NODE_EXISTS) {
            console.log('Node exists.');
            msg='节点'+path+'已经存在';
        } else {
            console.log(error.stack);
             msg='节点'+path+'创建失败';
        }
    }
    
    console.log('Node: %s is created.', path);
    res.send({data:msg}); 
   });
   
    
});
// 删除节点服务
 router.post('/dcm/zk/delete', function(req, res, next) { 
 	 res.set({'Content-Type':'text/json','Encodeing':'utf8'});
	var path=req.body.path; 
	var version=Number(req.body.version || -1); 
	console.log("setData path:"+path); 
	console.log("setData version:"+version);
    zk.client.remove(path,version, function (error) {
    if (error) {
        console.log(error.stack);
         res.send({data:'节点'+path+'删除失败'}); 
        return;
    }
 
    console.log('Node is deleted.');
     res.send({data:'节点'+path+'删除成功'}); 
    });
   
   
});

 
  
router.get('/dcm/server/stat', function(req, res, next) {
   res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    var mem = process.memoryUsage();
     var format = function(bytes) {
           return (bytes/1024/1024).toFixed(2)+'MB';
      };
   res.send( { 
          'heapTotal':format(mem.heapTotal),
          'heapUsed':format(mem.heapUsed),
          'rss':format(mem.rss) ,
          'version': process.version,
          'platform': process.platform,
          'pid': process.pid 
        }) ;
});



// router.post('/dcm/file/upload', function(req, res, next){
//      upload.uploadFile(req, res);
// });



module.exports = router;

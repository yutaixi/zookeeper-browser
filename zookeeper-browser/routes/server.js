var express = require('express'); 
var router = express.Router();
 


 
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

 
// var showMem = function() {
//      var mem = process.memoryUsage();
//      var format = function(bytes) {
//           return (bytes/1024/1024).toFixed(2)+'MB';
//      };
//      console.log('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
//      console.log('node version:'+process.version + '  node platform:'+process.platform + '  node pid:'+process.pid);
//      console.log('----------------------------------------');
// };


//   var period = 1000; // 1 second
//   setInterval(function() {
//        showMem();
//   }, period);


module.exports = router;

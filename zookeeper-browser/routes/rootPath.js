var express = require('express');   
 
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('dcm/index.html'); 
}); 
module.exports = router;

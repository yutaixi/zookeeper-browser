var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var serverRoute = require('./routes/server');
var fs = require('fs');
var app = express();

var multer  = require('multer') ;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
     console.log(file.fieldname);
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage,limits:{fieldSize:100000000000} });
  

app.post('/dcm/file/upload',upload.array('file',20), function (req, res, next) {
  var files=req.files;
  console.log(files[0]);
  if(files)
  {
    for(var index=0;index<(files.length || 1);index++)
    {
      fs.renameSync(files[index].path,files[index].destination+'/'+files[index].originalname);
    }
  }
  
   res.send('111');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
  
app.use('/', routes);  
app.use('/dcm', routes); 
//zk服务路由 
app.use('/server', routes);
app.use('/dcm/zk/*', routes); 
// app.use('/dcm/file/*', routes);  
app.use('/dcm/*.html', routes); 
app.use('/dcm/server/*', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

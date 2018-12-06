var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "172.168.2.77:7456");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var onlines={};//在线人
var onlinecount = 0;//在线人数
var lookingusers = []; //匹配中的用户
var rooms = [];//在线房间
var clientIndex = 1; //客户端index

// var io = require('socket.io')(3008);

// io.on('connection', function (socket) {
//   onlinecount++
//   socket.emit('comein', { onlinecount: onlinecount });
//   socket.on('playgame', function (data) {
//     //onlinecount++;
//     socket.name=data.uid;
//     onlines[data.uid] = data;
//     console.log(onlines);
//     socket.emit('comein', { onlinecount: onlinecount });
//     //加入待匹配队列
//     lookingusers.push(data.uid);
//     //匹配对手

//   });
  
//   //监听用户退出
//   socket.on('disconnect',function () {
//     //将退出用户在在线列表删除
//     if(onlines.hasOwnProperty(socket.name)){
//         //退出用户信息
//         var obj={uid:socket.name, name:onlines[socket.name].name};
//         //删除
//         delete onlines[socket.name];
//         //在线人数-1
//         //广播消息
//         //io.emit('logout',{onlines:onlines,onlinecount:onlinecount,user:obj});
//         console.log(obj.name+"退出游戏");
//     }else{
//       onlinecount--;
//     }
//   })
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;


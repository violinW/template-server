var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = require('./config/config.json').server.port;
var tokenVerify = require('./modules/tokenVerify');

/*----------------植入项目助手----------------*/
var knex = require('./modules/db')
const Assistent = require('./assistant/index')(knex);
const Anne = Assistent.Anne;
/*----------------植入项目助手----------------*/

var index = require('./routes/index')(Anne);
var user = require('./routes/user')(Anne);
var works = require('./routes/works')(Anne);
var draft = require('./routes/draft')(Anne);

var app = express();

app.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);

app.use('/', index);
//验证token并查询用户信息
app.use(tokenVerify);
app.use('/works', works);
app.use('/draft', draft);

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
  res.status(err.status || 500).send(err);
});

module.exports = app;

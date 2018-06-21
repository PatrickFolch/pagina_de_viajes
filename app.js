var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var hbsUtils = require('hbs-utils')(hbs);
let expressSession = require('express-session')
let flash = require('connect-flash')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let LoginRouter = require('./routes/integration');
let registerRouter = require('./routes/register');
let loginFlash = require('./routes/login-flash')
var app = express();

// view engine setup
hbsUtils.registerPartials(`${__dirname}/views/partials`)
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(expressSession({
  secret:'GeekhubsAcademy',
  name:'SesionGeek',
  resave: true,
  saveUninitialized:true
}));

app.use(flash());
hbs.registerPartials(`${__dirname}/views/partials`);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('bower_components',express.static(`${__dirname}/public/components`));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', LoginRouter);
app.use('/register', registerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
res.render('error404'); 
//next(createError(404));
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var hbsUtils = require('hbs-utils')(hbs);
let expressSession = require('express-session')
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var multer=require('./routes/multer')
var app = express();

//Register Partials.
hbsUtils.registerPartials(`${__dirname}/views/partials`)
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//Gestion de sesion
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

/*let env = process.env.NODE_ENV;
switch (env)
{
  case 'development':
    console.log("HAS ENTRADO EN MODO DESARROLLO.");
    break;
  case 'production':
    console.log("HAS ENTRADO EN MODO PRODUCCION.");
    break;
default:
  console.log("No has introducido un entorno de produccion");
  process.exit(1);
}*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/multer', multer)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
res.render('Error404'); 
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

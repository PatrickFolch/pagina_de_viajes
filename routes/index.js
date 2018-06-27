var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const LoginController = require('../controllers/loginController');
const SessionController = require('../controllers/sessionController');
/* GET home page. */
router.get('/', function (req, res, next) {
  let homeController = new HomeController(req, res, next);
  homeController.index();
  //res.render('index', { title: 'Geekshubs travels' });
});


//router.get('/register', function (req, res, next) {
  //res.render('register', {
    //title: 'Registro'
  //});
//})

router.get('/login',(req, res, next) => {
  let loginController = new LoginController(req, res, next)
  loginController.index();
})


router.post('/login', (req, res, next) => {
  let loginController = new LoginController(req, res, next);
  loginController.login();
})

router.get('/closeSession', (req, res, next) => {
  let sessionsController = new SessionController(req, res, next)
  sessionsController.closeSession();
  res.redirect('/');
})

module.exports = router;
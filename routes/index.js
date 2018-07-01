var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const LoginController = require('../controllers/loginController');
const RegisterController = require('../controllers/registerController')
const SessionController = require('../controllers/sessionController');
/* GET home page. */
router.get('/', function (req, res, next) {
  let homeController = new HomeController(req, res, next);
  homeController.index();
  //res.render('index', { title: 'Geekshubs travels' });
});



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

router.get('/register',(req, res, next)=>{
  let registerController = new RegisterController(req,res,next)
  registerController.index();
  });
router.post('/register',(req,res,next)=>{
  let registerController=new RegisterController(req,res,next)
  registerController.register(req.body);
})

module.exports = router;
var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const LoginController = require('../controllers/auth/loginController');
const SessionController = require('../controllers/auth/sessionController');
const RegisterController = require('../controllers/auth/registerController')
const ActivateUserController = require('../controllers/auth/activateUserController');
const RecoverController=require('../controllers/auth/recoverController')
/* GET home page. */
router.get('/', function(req, res, next) {
  let homeController = new HomeController(req, res, next);
  homeController.index();
});

router.get('/login',(req, res, next) =>{
  let loginController = new LoginController(req, res, next)
  loginController.index();
})


router.post('/login', (req, res, next) =>{
  let loginController = new LoginController(req, res, next);
  loginController.login();
})

router.get('/closeSession', (req, res, next) =>{
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
});
router.get('/activate/:hash',(req,res,next)=>{
  let activateUserController= new ActivateUserController(req,res,next)
  activateUserController.index();
});

router.get('/recover',(req,res,next)=>{
let recoverController = new RecoverController(req,res,next)
recoverController.index();
})

router.post('/recover',(req,res,next)=>{
  let recoverController = new RecoverController(req,res,next)
  recoverController.recover();
  });

router.get('/recover/password/:hash',(req,res,next)=>{
  let recoverController=new RecoverController(req,res,next)
  recoverController.formActivate();
  });

  router.post('/recover/password/:hash',(req,res,next)=>{
    let recoverController=new RecoverController(req,res,next)
    recoverController.activate();
    });
  
    module.exports = router;
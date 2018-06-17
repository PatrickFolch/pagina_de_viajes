var express = require('express');
var router = express.Router();
const LoginController= require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Geekshubs travels' });
});


router.get('/register',function(req,res,next){
  res.render('register', { title:'Registro'});
});


router.get('/login',(req, res, next)=>{
  let loginController = new LoginController(req, res, next);
  loginController.index();
 });
 
 
 router.post('/login',(req,res,next)=>{
  let loginController = new LoginController(req, res, next);
      loginController.login();
 })


module.exports = router;

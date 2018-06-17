const Express = require('express');
const Router = Express.Router();
const RegisterController=require('../controllers/registerController')

Router.get('/',(req,res,next)=>{
  let registerController = new RegisterController(req,res,next);
  registerController.index();
  });

  Router.post('/',(req,res,next)=>{
      let registerController = new RegisterController(req,res,next);
      registerController.register();
  })

  module.exports=Router;
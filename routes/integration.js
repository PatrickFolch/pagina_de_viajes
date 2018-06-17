const Express = require('express');
const Router = Express.Router();

Router.get('/',(req,res,next)=>{
    res.status(200).json("Integracion")
});

module.exports=Router;
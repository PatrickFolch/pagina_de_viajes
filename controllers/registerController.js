const Controller = require('./controller');
const UserModel = require('../models/users');
const IdentificationService = require('../service/indetificationService')
class registerController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }
    
    index()
    {
        if(this.req.flash.error){
            console.log(this.req.flash.error);
            this.res.render('register',{error:this.req.flash.error});
        }
        this.res.render('register')
    
    }
    register(registerData) 
    {
        let userModel = new UserModel();
        userModel.getUserByEmailOurUsername( registerData.usuario, registerData.email)
          .then((data)=>{
              if(data.lenght===0)
              {
                let indetificationService=new IdentificationService();                                 
              }
          })
            .catch((error)=>{
                console.log(error);
                
          })
    this.res.redirect('/register');    
        }
}      

module.exports=registerController;
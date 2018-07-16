const Controller = require('../controller');
const UsModel=require('../../models/userModel')
const IdentificationService = require('../../service/indetificationService')
const RegisterService = require('../../service/secureService')
const EmailService = require('../../service/emailService')
class registerController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    index() {
        if (this.req.flash.error) {
            console.log(this.req.flash.error);
            this.res.render('register', {error:this.req.flash.error});
            this.req.flash.error=null;
        }
        this.res.render('register',{error:null});

    }
    register(registerData) 
    {
    
        let registerService=new RegisterService();
        registerData.password=registerService.encryptPass(registerData.password);
        let identificationService = new IdentificationService();
        registerData.hash = identificationService.getUUIDD(3, 4)   
        UsModel.create(registerData)
        .then(user=>{
            let emailService= new EmailService();
            emailService.sendRegisterEmail(registerData);
            this.res.redirect('/register')
        })
        .catch(err=>{
            console.log(err);
            this.req.flash.error ="El usuario o el email ya esta en uso";
            this.res.redirect('/register');
            
            
        })
    }
}

module.exports = registerController;
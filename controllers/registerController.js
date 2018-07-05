const Controller = require('./controller');
const UserModel = require('../models/users');
const IdentificationService = require('../service/indetificationService')
const RegisterService = require('../service/secureService')
const EmailService = require('../service/emailService')
class registerController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    index() {
        if (this.req.flash.error) {
            console.log(this.req.flash.error);
            this.res.render('register', {
                error: this.req.flash.error
            });
        }
        this.res.render('register');

    }
    register(registerData) {
        console.log(registerData);
        
        let userModel = new UserModel();
        userModel.getUserByEmailOrUsername(registerData.email, registerData.usuario)
            .then((data) => {
                
                if (data.length == 0) {
                    let identificationService = new IdentificationService();
                    registerData.hash = identificationService.getUUIDD(3, 4);
                    let registerService=new RegisterService();
                    registerData.password=registerService.encryptPass(registerData.password);
                    userModel.insertUser(registerData).then(console.log).catch(console.error);
                    let emailService= new EmailService();
                    emailService.sendRegisterEmail(registerData);
                } else this.req.flash.error = "El usuario o el email ya esta en uso";
            })
            .catch((error) => {
                console.log(error);
            })
            this.res.redirect('/register');
        
    }
}

module.exports = registerController;
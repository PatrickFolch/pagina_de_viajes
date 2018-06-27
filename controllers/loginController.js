const Controller = require('./controller');
const UserModel = require('../models/users');
//const logger = require('../configuration/winston')
class LoginController extends Controller {
    constructor(req, res, next) {
        super(req, res, next);
        //logger.info('Iniciando Login')
    }
    
    index() {
        this.res.render('login')
    }

    login() {
        let userModels = new UserModel();
        
        userModels.findUser(this.req.body.lg_usuario)
            .then((data)=>{
                if(data.length===0) return console.log('no existe');
                if(data[0].password==this.req.body.lg_password)
                    this.req.session.usuario=data[0].usuario;       
            })
            .catch((error)=>{
                console.log(error);
                
            })
        this.res.render('login',{
            usuario: this.req.session.usuario,
            layout:'layout'
        });
    }

}

module.exports=LoginController;
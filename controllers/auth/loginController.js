const Controller = require('../controller');
const UsModel = require('../../models/userModel')
const SecureService = require('../../service/secureService')
class LoginController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }
    
    index() {
        if(this.req.flash.error){
            this.res.render('login',{error:this.req.flash.error})
        }
        if(this.req.session.usuario){
            this.res.render('login',{
            usuario: this.req.session.usuario
        });
        }else{
            this.res.render('login')
        }
    }

    login() {
    
        let secureService= new SecureService();

        UsModel.findOne({where:{usuario:this.req.body.lg_usuario}})
            .then((user)=>{
                console.log(JSON.stringify(user));
             if(user===null){
                this.req.flash.error="El usuario no existe";
                this.res.redirect('/login')
                return   
             }
             if(user.active===false){
                this.req.flash.error="La cuenta no esta activa"
                this.res.redirect('/login')
                return
             }
             if(secureService.comparePass(this.req.body.lg_password, user.password))
                 {
                     this.req.session.usuario=user.usuario;
                     this.res.render('login',{
                         usuario:user.usuario
                     })    
                 }
                     else{
                         this.req.flash.error="El usuario o contraseña es incorrecta"
                         this.res.redirect('/login')
                     }       
            })
                  
    }

}

module.exports=LoginController;
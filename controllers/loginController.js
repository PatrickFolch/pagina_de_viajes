const Controller = require('./controller');
const UserModel = require('../models/users');
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
        let userModels = new UserModel();
        
        userModels.findUser(this.req.body.lg_usuario)
            .then((data)=>{
                if(data.length==0) {
                    this.req.flash.error="El usuario no existe";
                    this.res.redirect('/login')
                }
                if(data[0].active==0){
                    this.req.flash.error="La cuenta no esta activa"
                    this.res.redirect('/login')
                    } 
                if(data[0].password==this.req.body.lg_password){
                    this.req.session.usuario=data[0].usuario;
                    this.res.render('login',{
                        usuario:data[0].usuario
                    })    
                }
                    else{
                        this.req.flash.error="El usuario o contraseña es incorrecta"
                        this.res.redirect('/login')
                    }   
            })
            .catch((error)=>{
                console.log(error);
                
            })
            //this.res.redirect('login');
          
    }

}

module.exports=LoginController;
const Controller = require('./controller');
const UserModel = require('../models/users');

class registerController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    register() {
        let usuario = this.req.body.uname;
        let email = this.req.body.email;
        let password = this.req.body.psw;
        
        let userModel = new UserModel();
        userModel.registro( usuario, email, password,(info)=>{
          
            console.log(info);
        
        });
        
        this.res.redirect('/login');    
        
    }

index()
{
    this.res.render('register',
    {title:'Register', layout:'layout'})
}
}




module.exports=registerController;
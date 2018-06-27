const Controller = require('./controller');

class homeController extends  Controller
{
    constructor(req,res,next){
        super (req,res,next)
    }

    index(){
        if(this.req.session.usuario){
            this.res.render('index',{
                title:'Home',
                usuario:this.req.session.usuario
            });
        }else{
            this.res.render('index',{
                tilte:'Home'
                });
        }
    }
    
}

module.exports = homeController;
const Controller=require('./controller')
const UserModel=require('../models/users')

let Activate = function(hash){
    return new Promise((resolve,reject)=>{
        let userModel= new UserModel();
        userModel.getUserByHash(hash)
            .then((User)=>{
                userModel.setActiveUser(hash)
                    .then(()=>{
                        resolve(User);
                    })
                    .catch((err)=>{
                        consosole.log('Error en activacion usuario'+ err)
                        reject('Error en activacion usuario'+ err);
                    })
            })    
            .catch((error)=>{
                console.log('Error en la busqueda de usuario');
                reject('Error en la busqueda de usuario '+error);
            });    
    });
    
};

class activateUserController extends Controller

{
    constructor(req,res,next)
    {
        super(req,res,next)
    }
    
    index()
    {
        Activate(this.req.params.hash)
            .then((data)=>{
                console.log('Mensaje' + JSON.stringify(data));
                if(data.length===0){
                    this.res.render('activate',
                        {title:'Activate',mensaje:"El hash no existe"});
                }
                else{
                    this.res.render('activate',
                        {title:'Activate',})
                }
            })
            .catch((error)=>{
                console.log("Error"+JSON.stringify(error));
                this.res.render('activate',
                    {title:'Activate',mensaje:"El hash no existe"})    
            })
    }
}

module.exports= activateUserController;
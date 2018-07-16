const Controller=require('../controller')
const UsModel=require('../../models/userModel')

class activateUserController extends Controller

{
    constructor(req,res,next)
    {
        super(req,res,next)
    }
    
    index()
    {
        UsModel.findOne({where:{hash:this.req.params.hash}})
        .then((user)=>{
            if(user===null){
                this.res.render('activate',
                    {title:'Activate',mensaje:"El hash no existe"})
                    return
            }
            user.active=true;
            user.hash="";
            user.save()
               .then((result)=>{
                   this.res.render('activate',
                        {title:'Activate'});
                })
                .catch((err)=>{
                    console.error(err);
                })
            })
            .catch((error)=>{
                console.error(error);
            })
            
        }
    }   
                 

module.exports= activateUserController;
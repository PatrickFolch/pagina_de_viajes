const Sequelize=require('sequelize')
const Controller=require('../controller')
const UsModel = require('../../models/userModel')
const IdentificationService=require('../../service/indetificationService')
const EmailService=require('../../service/emailService')
const SecureService=require('../../service/secureService')
class recoverController extends Controller
{
    constructor (req,res,next)
    {
        super(req,res,next);
    }
    
    recover()
    {
        let identificationService = new IdentificationService();
        UsModel.findOne({where:{[Sequelize.Op.or]:[{email:this.req.body.email},{usuario:this.req.body.email}]}})
            .then((user)=>{
              if(user===null){  
                this.req.flash.error="El usuario no existe"
                this.res.redirect('/recover');
                return
              }
              user.hash=identificationService.getUUIDD(3,3)
              user.active=false;
              user.save()
                .then(result=>{
                    console.log('Resultado ->'+ result.email);
                    let emailService = new EmailService();
                    emailService.sendRecoverEmail(result);
                    this.res.redirect('/login')
                })
           
            })
            .catch((error)=>{
                console.error(error);
            })
        
    }
    
    formActivate(){
        UsModel.findOne({where:{hash:this.req.params.hash}})
            .then((user)=>{
                if(user===null)
                {
                    this.req.flash.error="El hash no existe"
                    this.res.redirect('/recover')
                    return
                }
                this.res.render('recoverform',{
                title:'Recuperar password'
                })  
             })
        
    };
    
    activate(){
        let secureService = new SecureService();
        let hash = this.req.params.hash;
        let password = secureService.encryptPass(this.req.body.password);
        UsModel.findOne({where:{hash:hash}})
            .then((user)=>{
                if(user===null){
                    this.req.flash.error="El usuario no existe"
                    this.res.redirect('/recover')
                    return
                }
                user.hash="";
                user.active=true;
                user.password=password
                user.save()
                    .then((user)=>{
                        this.res.redirect('/login');     
                    })
                    .catch(error=>console.error(error));
            })
            }

    index()
    {
        if(this.req.flash.error){
        this.res.render('recover',{
            title:"Recuperar contraseña.",
            message: this.req.flash.error
        })
        }else{
            this.res.render('recover',{
                title:"Recuperar contraseña.",
                message:null        
            })
        }
    }
}
module.exports=recoverController
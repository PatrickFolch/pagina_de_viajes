const Controller=require('./controller')
const UserModel=require('../models/users')
const IdentificationService=require('../service/indetificationService')
const EmailService=require('../service/emailService')
const SecureService=require('../service/secureService')
class recoverController extends Controller
{
    constructor (req,res,next)
    {
        super(req,res,next);
    }
    
    recover()
    {
        let userModel = new UserModel();
        let identificationService = new IdentificationService();
        userModel.getUserByEmailOrUsername(this.req.body.email, null)
        .then((data)=>{
            data[0].hash=identificationService.getUUIDD(3,3)
            userModel.setDesctivateUser(data[0])
                .then((user)=>{
                    let emailService = new EmailService();
                    emailService.sendRecoverEmail(data[0]);
                    this.res.redirect('/login')
                })
                .catch(error=>{console.log(error)})
        })
            //.catch(error=>console.error(error))
    }
    formActivate(){
        let userModel=new UserModel();
        userModel.getUserByHash(this.req.params.hash)
            .then((data)=>{
                
                console.log(JSON.stringify(data));
                if(data.lenght===0){
                    this.req.flash.error="El hash no existe"
                    this.res.redirect('/recover')
                }
                else{
                    this.res.render('recoverform',{
                        title:'Recuperar password'
                    });
                }    
            
            })
        
    };
    
    activate(){
        let secureService = new SecureService();
        let hash = this.req.params.hash;
        let password = secureService.encryptPass(this.req.body.password);
        let userModel=new UserModel();
        userModel.setActiveRecover(hash,password)
            .then((data)=>{
                this.res.redirect('/login');
            })
            .catch((error)=>{
                console.error(error);
                
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
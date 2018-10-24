const Controller = require('./controller');
const Viajes = require('../models/viajesModel');

class viajesController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }
    index() {
        if (this.req.flash.error) {
            console.log(this.req.flash.error);
            this.res.render('uploads', {error:this.req.flash.error});
            this.req.flash.error=null;
        }
        this.res.render('uploads',{error:null});

    }
         createTravel(travelData)
         {
            Viajes.create(travelData)
            .then(user=>{  
                this.res.redirect('multer')
            })
            .catch(err=>{
                console.log(err);
                this.req.flash.error ="El viaje no se ha creado";
                this.res.redirect('multer');  
            })
         }

}

module.exports = viajesController;
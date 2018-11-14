const Controller = require('./controller')
const Viajes = require('../models/viajesModel')

class desactivarViajeController extends Controller{
    constructor(req,res,next){
        super(req,res,next)
    }
    desactivateTravel(){
        var desactiveTravel=0;
        const Id= this.req.params.id;
        Viajes.findOne({where:{id:Id}})
        .then(viaje=>{
            viaje.updateAttributes({
                active:desactiveTravel
            })
        })
    }
    
}

module.exports = desactivarViajeController;
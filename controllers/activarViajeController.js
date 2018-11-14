const Controller = require('./controller')
const Viajes = require('../models/viajesModel')

class activarViajeController extends Controller{
    constructor(req,res,next){
        super(req,res,next)
    }
    activateTravel(){
        var activeTravel=1;
        const Id= this.req.params.id;
        Viajes.findOne({where:{id:Id}})
        .then(viaje=>{
            viaje.updateAttributes({
                active:activeTravel
            })
        })
    }
    
}

module.exports = activarViajeController;
const Controller = require('./controller');
const Viajes = require('../models/viajesModel')

class descripcionController  extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    index() {
        const viajesId = this.req.params.id;
        Viajes.findOne({where:{id:viajesId}}).then(viaje=>{
                        this.res.render('descripcion', {
                            title: 'Descripcion viaje',
                            usuario: this.req.session.usuario,
                            viaje: viaje
                        });
                     })  
                    }
                }

module.exports = descripcionController ;
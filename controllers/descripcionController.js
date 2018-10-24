const Controller = require('./controller');
const Viajes = require('../models/viajesModel')

class descripcionController  extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    index() {
          
        Viajes.findAll({
            where:{active:true}
        }).then(viajes => {
        
            if (this.req.session.usuario) {
                this.res.render('descripcion', { 
                    title: 'Home',
                    usuario: this.req.session.usuario,
                    admin: this.req.session.admin,
                    viajes: [...viajes]
                });
            } else {
                this.res.render('descripcion', { 
                    tilte: 'Home',
                    viajes:[...viajes]
                });
            }
            });
        
    }

}

module.exports = descripcionController ;
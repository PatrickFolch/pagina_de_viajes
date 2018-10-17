const Controller = require('./controller');
const Viajes = require('../models/viajesModel')

class homeController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }

    index() {
        // console.log('render->')
     
        Viajes.findAll({
            where:{active:true}
        }).then(viajes => {
            
            // console.log(viajes)
            if (this.req.session.usuario) {
                this.res.render('index', { 
                    title: 'Home',
                    usuario: this.req.session.usuario,
                    admin: this.req.session.admin,
                    viajes: [...viajes]
                });
            } else {
                this.res.render('index', { 
                    tilte: 'Home',
                    viajes:[...viajes]
                });
            }
            });
        
    }

}

module.exports = homeController;
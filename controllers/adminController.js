const Controller = require('./controller')
const Viajes = require('../models/viajesModel')
class adminController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }
    index() {
        Viajes.findAll().then(viajes => {
            if (this.req.session.admin) {
                this.res.render('admin', {
                    title: 'Admin',
                    admin: this.req.session.admin,
                    usuario: this.req.session.usuario,
                    viajes: [...viajes]
                });
            } else {
                this.res.redirect('/')


            }
        })
    }
}

module.exports = adminController
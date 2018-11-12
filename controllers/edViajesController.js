const Controller = require('./controller');
const Viajes = require('../models/viajesModel');

class edViajesController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
    }
    index() {
        const viajesId = this.req.params.id;
Viajes.findOne({where:{id:viajesId}}).then(viaje=>{
            if (this.req.session.admin) {
                this.res.render('editar', {
                    title: 'Editar Viaje',
                    admin: this.req.session.admin,
                    usuario: this.req.session.usuario,
                    viaje: viaje
                });
            } else {
                this.res.redirect('/')
            }
        })
        
        }
    editarViaje() {
        const Id = this.req.params.id;
        console.log(JSON.stringify(this.req.body));
        const Viaje = this.req.body.viaje;
        const Precio = this.req.body.precio;
        const Descripcion = this.req.body.descripcion;
        const Imagen = this.req.body.img_path;
        
        Viajes.findOne({where:{id:Id}})
            .then(viajes=> {
                viajes.updateAttributes({
                    viaje:Viaje,
                    precio:Precio, 
                    descripcion:Descripcion,
                    img_path:Imagen               
                });
                // console.log(Viaje);
                
                this.res.redirect('/admin')
            })
    }

}



module.exports = edViajesController;
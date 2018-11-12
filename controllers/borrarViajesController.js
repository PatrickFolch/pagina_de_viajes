const Controller = require('./controller');
const Viajes = require('../models/viajesModel')
class borrarViajesController extends Controller {
    constructor(req, res, next) {
        super(req, res, next);
    }
    deleteTravel() {
        const Id = this.req.params.id;
        Viajes.destroy({
            where: {
                id: Id
            }
        }).then(borrado => {
            console.log(borrado);
        })
    }
}
module.exports = borrarViajesController;
const logger = require('log4js').getLogger("BloqueoDAO");
const Bloqueo = require('../models/Bloqueo');

class BloqueoDAO {

    constructor() {
    }

    async buscar(ip) {
        var respuesta = await Bloqueo.findOne({ ip: ip });
        return respuesta;
    }

    async guardar(objeto) {
        logger.info(" ::: Guarda Informacion de una ip bloqueada :::");
        var bloqueoip = new Bloqueo(objeto);
        return await bloqueoip.save();
    }

    async actualiza(objeto) {
        logger.info(" ::: Actualiza Informacion de una posible ip :::");
        var bloqueoip = new Bloqueo(objeto);
        var respuesta = await Bloqueo.updateOne({ _id: objeto.id}, bloqueoip, function(error, doc) {
            if (error) {
                throw new Error("::: Ocurrio un error al guardar la informacion de bloqueados :::")
            } else {
                return doc;
            }
        }).exec();
        return respuesta;
    }

    async eliminar(id) {
        logger.info(" ::: Elimina la informacion de la ip bloqueada :::");
        var respuesta = await Bloqueo.findByIdAndDelete(id).exec();
        return respuesta;
    }

    async listar() {
        var respuesta = await Bloqueo.find({contador:3});
        return respuesta;
    }

}

module.exports = BloqueoDAO;
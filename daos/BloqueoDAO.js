const logger = require('log4js').getLogger("BloqueoDAO");
const Bloqueo = require('../models/Bloqueo');

class BloqueoDAO {

    constructor() {
    }

    async guardar(objeto) {
        logger.info(" ::: Guarda Informacion de una ip bloqueada :::");
        var bloqueoip = new Bloqueo(objeto);
        return await bloqueoip.save();
    }

    async actualiza(objeto) {
        logger.warn(" ::: Actualiza Informacion de una posible ip :::");
        var bloqueoip = new Bloqueo(objeto);
        return await bloqueoip.findOneAndUpdate({ id: objeto.id}, objeto).exec();
    }

}

module.exports = BloqueoDAO;
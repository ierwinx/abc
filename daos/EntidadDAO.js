const logger = require('log4js').getLogger("EntidadDAO");
const Entidad = require('../models/entidad');

class EntidadDAO {

    constructor() {
    }

    async listar() {
        logger.info(" ::: Consulta entidades en BD :::");
        var respuesta = await Entidad.find().sort({id: 'ascending'});
        return respuesta;
    }

    async get(id) {
        logger.info(" ::: Consulta entidades por id :::");
        var respuesta = await Entidad.findOne({ id: id });
        if (respuesta) {
            return respuesta;
        } else {
            throw new Error(`No se encontraron resultados de la entidad ${id}`);
        }
    }

}

module.exports = EntidadDAO;
const logger = require('log4js').getLogger("entidadDAO");
const Entidad = require('../models/entidad');

var listar = async(objeto) => {
    logger.info(" ::: Consulta entidades en BD :::");
    var respuesta = await Entidad.find().sort({id: 'ascending'});
    return respuesta;
}

var get = async(id) => {
    logger.info(" ::: Consulta entidades por id :::");
    var respuesta = await Persona.findOne({ id: id });
    if (respuesta) {
        return respuesta;
    } else {
        throw new Error(`No se encontraron resultados de la entidad ${id}`);
    }
}

module.exports = {
    listar,
    get
}
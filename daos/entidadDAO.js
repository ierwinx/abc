var logger = require('log4js').getLogger("entidadDAO");
var Entidad = require('../models/entidad');

var listar = async(objeto) => {
    logger.info(" ::: Consulta entidades en BD :::");
    var respuesta = await Entidad.find().sort({id: 'ascending'});
    return respuesta;
}

module.exports = {
    listar
}
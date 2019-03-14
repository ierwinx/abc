var logger = require('log4js').getLogger("flujoDAO");
var Flujo = require('../models/flujo');

var guardar = async(objeto) => {
    logger.info(" ::: Guarda Informacion de un flujo :::");
    var flujo = new Flujo(objeto);
    var errores = flujo.validateSync();
    if (errores) {
        throw new Error(errores.message.replace('flujo validation failed: ','ValidationError: '));
    } else {
        return await flujo.save();
    }
}

var actualizar = async(objeto) => {
    logger.info(" ::: Actualiza la Informacion de un flujo por ID :::");
    var flujo = new Flujo(objeto);
    var errores = flujo.validateSync();
    if (errores) {
        throw new Error(errores.message.replace('flujo validation failed: ','ValidationError: '));
    } else {
        return await Flujo.findOneAndUpdate({ idFlujo: objeto.idFlujo}, objeto).exec();
    }
}

var eliminar = async(id) => {
    logger.info(" ::: Elimina un flujo por ID :::");
    var respuesta = await Flujo.deleteOne({ idFlujo: id }).exec();
    return respuesta;
}

var listar = async() => {
    logger.info(" ::: Consulta todos los flujos :::");
    var respuesta = await Flujo.find();
    return respuesta;
}

var buscar = async(id) => {
    logger.info(" ::: Consulta un flujo por ID :::");
    var respuesta = await Flujo.findOne({ idFlujo: id });
    if (respuesta) {
        if (respuesta.status === true) {
            return respuesta;
        } else {
            throw new Error(`El flujo ${id} actualmente no se encuentra disponible`);
        }
    } else {
        throw new Error(`No se encontraron resultados para el flujo ${id}`);
    }
}

var total = async() => {
    logger.info(" ::: Cuenta todo los flujos en db :::");
    var respuesta = await Flujo.countDocuments().exec();
    return respuesta;
}

module.exports = {
    guardar,
    eliminar,
    actualizar,
    listar,
    buscar,
    total
}
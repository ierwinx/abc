var logger = require('log4js').getLogger("caracteristicaDAO");
var Caracteristica = require('../models/caracteristica');

var guardar = async(objeto) => {
    logger.info(" ::: Guarda Informacion de una Caracteristica :::");
    var caracteristica = new Caracteristica(objeto);
    var errores = caracteristica.validateSync();
    if (errores) {
        throw new Error(errores.message.replace('caracteristica validation failed: ','ValidationError: '));
    } else {
        return await caracteristica.save();
    }
}

var actualizar = async(objeto) => {
    logger.info(" ::: Actualiza la Informacion de una Caracteristica por ID :::");
    var caracteristica = new Caracteristica(objeto);
    var errores = caracteristica.validateSync();
    if (errores) {
        throw new Error(errores.message.replace('caracteristica validation failed: ','ValidationError: '));
    } else {
        return await caracteristica.findOneAndUpdate({ id: objeto.id}, objeto).exec();
    }
}

var eliminar = async(id) => {
    logger.info(" ::: Elimina una Caracteristica por ID :::");
    var respuesta = await Caracteristica.deleteOne({ id: id }).exec();
    return respuesta;
}

var listar = async() => {
    logger.info(" ::: Consulta todos las Caracteristica :::");
    var respuesta = await Caracteristica.find();
    return respuesta;
}

var buscar = async(id) => {
    logger.info(" ::: Busca una Caracteristica por ID :::");
    var respuesta = await Caracteristica.findOne({ id: id });
    if (respuesta) {
        return respuesta;
    } else {
        throw new Error(`No se encontraron resultados para la caracteristica ${id}`);
    }
}

var compatibles = async(id) => {
    logger.info(" ::: Busca una Caracteristica por flujo :::");
    var respuesta = await Caracteristica.find({ flujosCompatibles: id });
    if (respuesta) {
        return respuesta;
    } else {
        throw new Error(`No cuenta con caracteristicas compatibles`);
    }
}

var total = async() => {
    logger.info(" ::: Cuenta todo las Caracteristica en db :::");
    var respuesta = await Caracteristica.countDocuments().exec();
    return respuesta;
}

module.exports = {
    guardar,
    eliminar,
    actualizar,
    listar,
    buscar,
    total,
    compatibles
}
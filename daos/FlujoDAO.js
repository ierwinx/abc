const logger = require('log4js').getLogger("FlujoDAO");
const Flujo = require('../models/Flujo');

class FlujoDAO {

    constructor() {
    }

    async guardar(objeto) {
        logger.info(" ::: Guarda Informacion de un flujo :::");
        var flujo = new Flujo(objeto);
        var errores = flujo.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al guarda un flujo :::");
            throw new Error(errores.message.replace('flujo validation failed: ','ValidationError: '));
        } else {
            return await flujo.save();
        }
    }

    async actualizar(objeto) {
        logger.info(" ::: Actualiza la Informacion de un flujo por ID :::");
        var flujo = new Flujo(objeto);
        var errores = flujo.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al actualizar un flujo :::");
            throw new Error(errores.message.replace('flujo validation failed: ','ValidationError: '));
        } else {
            return await Flujo.findOneAndUpdate({ idFlujo: objeto.idFlujo}, objeto).exec();
        }
    }

    async eliminar(id) {
        logger.info(" ::: Elimina un flujo por ID :::");
        var respuesta = await Flujo.deleteOne({ idFlujo: id }).exec();
        return respuesta;
    }

    async listar() {
        logger.info(" ::: Consulta todos los flujos :::");
        var respuesta = await Flujo.find();
        return respuesta;
    }

    async buscar(id) {
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

    async total() {
        logger.info(" ::: Cuenta todo los flujos en db :::");
        var respuesta = await Flujo.countDocuments().exec();
        return respuesta;
    }

}

module.exports = FlujoDAO;
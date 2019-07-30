const logger = require('log4js').getLogger("CaracteristicaDAO");
const Caracteristica = require('../models/Caracteristica');

class CaracteristicasDAO {

    constructor() {
    }

    async guardar(objeto) {
        logger.info(" ::: Guarda Informacion de una Caracteristica :::");
        var caracteristica = new Caracteristica(objeto);
        var errores = caracteristica.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al guarda una Caracteristica :::");
            throw new Error(errores.message.replace('caracteristica validation failed: ','ValidationError: '));
        } else {
            return await caracteristica.save();
        }
    }

    async actualizar(objeto) {
        logger.info(" ::: Actualiza la Informacion de una Caracteristica por ID :::");
        var caracteristica = new Caracteristica(objeto);
        var errores = caracteristica.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al actualizar una Caracteristica :::");
            throw new Error(errores.message.replace('caracteristica validation failed: ','ValidationError: '));
        } else {
            return await caracteristica.findOneAndUpdate({ id: objeto.id}, objeto).exec();
        }
    }

    async eliminar(id) {
        logger.info(" ::: Elimina una Caracteristica por ID :::");
        var respuesta = await Caracteristica.deleteOne({ id: id }).exec();
        return respuesta;
    }

    async listar() {
        logger.info(" ::: Consulta todos las Caracteristica :::");
        var respuesta = await Caracteristica.find();
        return respuesta;
    }

    async buscar(id) {
        logger.info(" ::: Busca una Caracteristica por ID :::");
        var respuesta = await Caracteristica.findOne({ id: id });
        if (respuesta) {
            return respuesta;
        } else {
            throw new Error(`No se encontraron resultados para la caracteristica ${id}`);
        }
    }

    async compatibles(id) {
        logger.info(" ::: Busca una Caracteristica por flujo :::");
        var respuesta = await Caracteristica.find({ flujosCompatibles: id });
        if (respuesta) {
            return respuesta;
        } else {
            throw new Error(`No cuenta con caracteristicas compatibles`);
        }
    }

    async total() {
        logger.info(" ::: Cuenta todo las Caracteristica en db :::");
        var respuesta = await Caracteristica.countDocuments().exec();
        return respuesta;
    }

}

module.exports = CaracteristicasDAO;
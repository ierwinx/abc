const logger = require('log4js').getLogger("ClienteDAO");
const Cliente = require('../models/Cliente');

class ClienteDAO {

    constructor() {
    }

    async guardar(objeto) {
        logger.info(" ::: Guarda Informacion de un Cliente :::");
        objeto.fecha = new Date();
        var cliente = new Cliente(objeto);
        var errores = cliente.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al guarda un cliente :::");
            throw new Error(errores.message.replace('cliente validation failed: ','ValidationError: '));
        } else {
            return await cliente.save();
        }
    }

    async actualizar(objeto) {
        logger.info(" ::: Actualiza la Informacion de un flujo por ID :::");
        var flujo = new Cliente(objeto);
        var errores = flujo.validateSync();
        if (errores) {
            logger.error(" ::: Ocurrio un Error el las validaciones al actualizar un cliente :::");
            throw new Error(errores.message.replace('cliente validation failed: ','ValidationError: '));
        } else {
            return await Cliente.findOneAndUpdate({ _id: objeto._id}, objeto).exec();
        }
    }

    async eliminar(id) {
        logger.info(" ::: Elimina un Cliente por ID :::");
        var respuesta = "";
        await Cliente.deleteOne({ _id: id }, function(error, resp) {
            if (error) {
                logger.error(" ::: Ocurrio un Error al eliminar un cliente :::");
                throw new Error("Ocurrio un error con el sistema de borrado");
            } else {
                if (resp.ok == 1) {
                    respuesta = "Se elimino el cliente " + id;
                } else {
                    throw new Error("Ocurrio un error con el sistema de borrado");
                }
            }
        }).exec();
        return respuesta;
    }

    async listar() {
        logger.info(" ::: Consulta todos los Clientes :::");
        var respuesta = await Cliente.find();
        return respuesta;
    }

    async buscar(id) {
        logger.info(" ::: Consulta un Cliente por ID :::");
        var respuesta = await Cliente.find({ usuarioLogin: id });
        return respuesta;
    }

    async total() {
        logger.info(" ::: Cuenta todo los Cliente en db :::");
        var respuesta = await Cliente.countDocuments().exec();
        return respuesta;
    }

    //Para reambientar
    async activar (id) {
        logger.info(" ::: Activa cliente para reambientar :::")
        var respuesta = await Cliente.updateOne({ _id: id }, { estatusCliente: true }).exec();
        return respuesta;
    }

    async get(id) {
        logger.info(" ::: Consulta Informacion del cliente por ID :::")
        var respuesta = await Cliente.findById(id);
        return respuesta;
    }

    async eliminaCliente(id) {
        logger.info(" ::: Elimina el cliente :::")
        var respuesta = await DatosCliente.findOneAndDelete({ _id: id }).exec();
        return respuesta;
    }

}

module.exports = ClienteDAO;
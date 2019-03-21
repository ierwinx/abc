var logger = require('log4js').getLogger("flujoDAO");
var Cliente = require('../models/cliente');

var guardar = async(objeto) => {
    logger.info(" ::: Guarda Informacion de un Cliente :::");
    var cliente = new Cliente(objeto);
    var errores = cliente.validateSync();
    if (errores) {
        logger.error(" ::: Ocurrio un Error el las validaciones al guarda un cliente :::");
        throw new Error(errores.message.replace('cliente validation failed: ','ValidationError: '));
    } else {
        return await cliente.save();
    }
}

var actualizar = async(objeto) => {
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

var eliminar = async(id) => {
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

var listar = async() => {
    logger.info(" ::: Consulta todos los Clientes :::");
    var respuesta = await Cliente.find();
    return respuesta;
}

var buscar = async(id) => {
    logger.info(" ::: Consulta un Cliente por ID :::");
    var respuesta = await Cliente.find({ usuarioLogin: id });
    return respuesta;
}

var total = async() => {
    logger.info(" ::: Cuenta todo los Cliente en db :::");
    var respuesta = await Cliente.countDocuments().exec();
    return respuesta;
}

//Para reambientar
var activar = async(id) => {
    logger.info(" ::: Activa cliente para reambientar :::")
    var respuesta = await Cliente.updateOne({ _id: id }, { estatusCliente: true }).exec();
    return respuesta;
}
var get = async(id) => {
    logger.info(" ::: Consulta Informacion del cliente por ID :::")
    var respuesta = await Cliente.findById(id);
    return respuesta;
}
var eliminaCliente = async(id) => {
    logger.info(" ::: Activa cliente para reambientar :::")
    var respuesta = await DatosCliente.findOneAndDelete({ _id: id }).exec();
    return respuesta;
}

module.exports = {
    guardar,
    eliminar,
    actualizar,
    listar,
    buscar,
    total,
    activar,
    get,
    eliminaCliente
}
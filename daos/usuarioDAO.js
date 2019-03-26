const logger = require('log4js').getLogger("usuarioDAO");
const Usuario = require('../models/usuario');

var guardar = async(objeto) => {
    logger.info(" ::: Guarda Informacion del Usuario :::");
    var user = new Usuario(objeto);
    var errores = user.validateSync();
    if (errores) {
        logger.error(" ::: Ocurrio un Error el las validaciones al guarda un usuario :::");
        throw new Error(errores.message.replace('usuario validation failed: ','ValidationError: '));
    } else {
        var resp = await user.save().then().catch(err => {
            logger.error(" ::: La informacion no pasa las validaciones :::");
            if (err.errors) {
                Object.keys(err.errors).forEach(element => {
                    throw new Error('ValidationError: ' + element + ' : ' + err.errors[element].message);
                });
            }
        });
        return resp;
    }
}

var actualizar = async(objeto) => {
    logger.info(" ::: Actualiza la Informacion del Usuario por ID :::");
    var user = new Usuario(objeto);
    var errores = user.validateSync();
    if (errores) {
        logger.error(" ::: Ocurrio un Error el las validaciones al actualizar un usuario :::");
        throw new Error(errores.message.replace('usuario validation failed: ','ValidationError: '));
    } else {
        return await Usuario.findOneAndUpdate({_id: objeto.id}, objeto).exec();
    }
}

var eliminar = async(id) => {
    logger.info(" ::: Elimina un usuario por ID :::");
    var respuesta = await Usuario.deleteOne({_id: id }).exec();
    return respuesta;
}

var listar = async() => {
    logger.info(" ::: Consulta todos los usuarios :::");
    var respuesta = await Usuario.find();
    return respuesta;
}

var buscar = async(id) => {
    logger.info(" ::: Elimina un usuario por ID :::");
    var respuesta = await Usuario.findOne({ _id: id }, function(err, user) {
        if (err) {
            logger.error(" ::: Ocurrio un Error al buscar un usuario :::");
            throw new Error("Ocurrio un problema con el servicio de Login");
        } else {
            if (!user) {
                throw new Error("El usuario no existe en el sistema");
            } else {
                return user;
            }
        }
        
    });
    return respuesta;
}

var buscarNumeroUsuario = async(numero) => {
    logger.info(" ::: Buscar un usuario por ID :::");
    var respuesta = {};
    await Usuario.findOne({ usuario: numero }, function(err, user) {
        if (err) {
            logger.error(" ::: Ocurrio un Error al buscar un usuario :::");
            return respuesta = 0;
        } else {
            if (!user) {
                logger.error(" ::: Ocurrio un Error al buscar un usuario :::");
                return respuesta = 1;
            } else {
                if (!user.status) {
                    logger.error(" ::: El usuario encontrado no esta autorizado :::");
                    return respuesta = 2;
                } else {
                    return respuesta = user;
                }
            }
        }
        
    });
    return respuesta;
}

var activar = async(objeto) => {
    logger.info(" ::: Activa un usuario por ID :::");
    var respuesta = await Usuario.findOneAndUpdate({_id: objeto.id}, { status: objeto.status }).exec();
    return respuesta;
}

var total = async() => {
    logger.info(" ::: Cuenta todo los usuarios en db :::");
    var respuesta = await Usuario.countDocuments().exec();
    return respuesta;
}

module.exports = {
    guardar,
    eliminar,
    actualizar,
    listar,
    buscar,
    activar,
    total,
    buscarNumeroUsuario
}
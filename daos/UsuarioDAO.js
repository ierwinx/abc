const logger = require('log4js').getLogger("UsuarioDAO");
const Usuario = require('../models/Usuario');

class UsuarioDAO {
    
    constructor() {
    }

    async guardar(objeto) {
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

    async actualizar(objeto) {
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

    async eliminar(id) {
        logger.info(" ::: Elimina un usuario por ID :::");
        var respuesta = await Usuario.deleteOne({_id: id }).exec();
        return respuesta;
    }

    async listar() {
        logger.info(" ::: Consulta todos los usuarios :::");
        var respuesta = await Usuario.find();
        return respuesta;
    }

    async buscar(id) {
        logger.info(" ::: Busca un usuario por ID :::");
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

    async buscarCorreo(email) {
        logger.info(" ::: Buscar un usuario por email ::: "+ email);
        var respuesta = {};
        await Usuario.findOne({ correo: email }, function(err, user) {
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

    async activar(objeto) {
        logger.info(" ::: Activa un usuario por ID :::");
        var respuesta = await Usuario.findOneAndUpdate({_id: objeto.id}, { status: objeto.status }).exec();
        return respuesta;
    }

    async total() {
        logger.info(" ::: Cuenta todo los usuarios en db :::");
        var respuesta = await Usuario.countDocuments().exec();
        return respuesta;
    }

}

module.exports = UsuarioDAO;
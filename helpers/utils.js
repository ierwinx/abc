const logger = require('log4js').getLogger("Utils");
const uuidv1 = require('uuid/v1');
const UsuarioDAO = require('../daos/UsuarioDAO');
const DSI = require("../services/OAUTH/DSI");
const Encriptar = require("../helpers/Encriptar");

class Utils {

    constructor() {
    }

    static printJson(res, status, mensaje, object) {
        var aleatorio = Math.floor(Math.random() * 99);

        var json = {
            codigo: status + ".banca_digital-ambientacion_clientes." + aleatorio,
            mensaje: mensaje,
            info: "http://developer.company.com/errors#" + status + ".01." + aleatorio,
            folio: uuidv1()
        }
        if (object !== null) {
            json[object.titulo] = object.objeto
        }
        logger.info(" ::: JSON respuesta " + JSON.stringify(json) + " con Status " + status + " ::: ");
        //res.status(status).json(Encriptar.aes256(JSON.stringify(json)));
        res.status(status).json(json);
    }

    verifyToken(req, res, next) {
        logger.info("::: se valida acceso al sistema :::");

        var header = req.headers['authorization'];
        if (!header) {
            logger.error("::: "+process.env.e400+" :::");
            return Utils.printJson(res, 400, process.env.e400, { titulo: 'Errores', objeto: [{message:process.env.e400}] });
        }
        var bearer = "";
        try {
            bearer = Desencriptar.aes256(header);
        } catch(err) {
            logger.error("::: "+process.env.e403+" :::");
            return Utils.printJson(res, 403, process.env.e403, { titulo: 'Errores', objeto: process.env.e403 });
        }

        var dsi = new DSI();
        dsi.validaToken(bearer).then(decoded => {
            logger.info(" ::: Se obtiene el usuario a loguearse "+decoded.user_id+" :::");
            dsi.verificaInformacion(decoded.user_id).then(async(resp) => {
                
                var usuariodao = new UsuarioDAO();
                var usuario = await usuariodao.buscarNumeroUsuario(decoded.user_id).then();

                if (usuario == 0) {
                    return Utils.printJson(res, 500, "Ocurrio un problema al buscar el usuario", { titulo: 'Errores', objeto: [{registro:false, autorizado:false}] });
                } else if (usuario == 1) {
                    return Utils.printJson(res, 500, "Usuario no encontrado", { titulo: 'Errores', objeto: [{registro:false, autorizado:false}] });
                } else if (usuario == 2) {
                    return Utils.printJson(res, 500, "El usuario encontrado no esta autorizado", { titulo: 'Errores', objeto: [{registro:true, autorizado:false}] });
                }

                if (Desencriptar.aes256(usuario.usuario) != resp.usuario.No_empleado) {
                    Utils.printJson(res, 500, "Error al verificar usuario", null);
                } else {
                    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
                    if (ip != "::1") {
                        if (Desencriptar.aes256(usuario.ip) != ip) {
                            Utils.printJson(res, 505, process.env.e505, null);
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                }
                
            }).catch(err => {
                Utils.printJson(res, 500, err.message, { titulo: 'Errores', objeto: [{message:error.message}] });
            });
        }).catch(err => {
            Utils.printJson(res, 400, err.message, { titulo: 'Errores', objeto: [{message:error.message}] });
        });
        
    }

}

module.exports = Utils;
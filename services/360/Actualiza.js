const logger = require('log4js').getLogger("Actualiza");
const querystring = require('querystring');
const https = require("https");
const Utils = require("../../helpers/Utils");

class Actualiza {

    constructor() {
    }

    contrasena() {
        logger.info(" ::: se consulta el servicio rest 360 para actualizar PWS de X usuario ::: ")

        var objetoEn = JSON.stringify({
            icu: objeto.icu,
            new_password: objeto.contra
        });

        logger.info("POST: " + objetoEn);

        var servicio = new Promise((resolve, reject) => {
            var req = https.request({
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/morannon/actualiza/password/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta.estatus == 0) {
                        if (respuesta.respuesta && respuesta.respuesta.actualizo) {
                            objeto.respuesta= "Registro actualizado";
                            resolve(objeto);
                        } else {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio actualizacion de pws X sucursal 360 ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio de 360 actualizacion pws X usuario"));
                        }
                    } else if (respuesta.estatus == 1) {
                        reject(new Error("La nueva contraseña no puede ser igual a la anterior"));
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio actualizacion pws de X usuario 360 ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de 360 actualizacion pws X usuario"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio actualizacion pws X usuario 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de 360 actualizacion pws X usuario"));

            });
            req.write(objetoEn);
            req.end();

        });

        return servicio;

    }

    extendidos(objeto) {
        logger.info(" ::: Inicia actualiza extendidos de 360 :::");

        var servicio = new Promise((resolve, reject) => {
            var query = {
                "icu": objeto.icu,
                "codigo_pais": objeto.codigoPais,
                "telefono": objeto.numCel,
                "push_id": objeto.pushId,
                "tipo_dispositivo": objeto.tipoDispositivo,
                "info_hash": objeto.infoHash,
                "aceptar_publicidad": objeto.aceptaPublicidad,
                "compartir_datos": objeto.comparteDatos
            };

            logger.info("POST: " + JSON.stringify(query));

            var reques = https.request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/isengard/extendidos-bdm/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta= JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta.error && respuesta.error.mensaje) {
                        reject("Ocurrio un Error con el alta del servicio extendidos de 360");
                    } else {
                        resolve(respuesta);
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de extendidos de 360 ::: ");
                if (err.response.data) {
                    reject(err.response.data);
                } else {
                    reject(new Error("Ocurrio un Error con el alta del servicio extendidos de 360"));
                }
            });
            reques.write(JSON.stringify(query));
            reques.end();
        });

        return servicio;
    }

}

module.exports = Actualiza
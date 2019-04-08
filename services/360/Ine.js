const logger = require('log4js').getLogger("Ine");
const querystring = require('querystring');
const https = require("https");
const Utils = require("../../helpers/Utils");

class Ine {

    constructor() {
    }

    alta(ine) {
        logger.info(" ::: se consulta servicio rest 360 para alta de ine :::");
        logger.info("POST: " + JSON.stringify(ine));
    
        var servicio = new Promise((resolve, reject) => {
            var reques = https.request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ine/alta/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    resolve(respuesta);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de alta ine 360 ::: ");
                if (err.response) {
                    resolve(err.response);
                } else {
                    reject(new Error("Ocurrio un Error con el consumo del servicio de alta ine 360"));
                }
            });
            reques.write(JSON.stringify(ine));
            reques.end();
        });
        
        return servicio;
    }

    consulta(ine) {
        logger.info(" ::: se consulta servicio rest 360 para consulta de ine :::");
    
        var query = querystring.stringify(ine);
    
        logger.info("GET: " + query);
        var servicio = new Promise((resolve, reject) => {
            https.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ine/consulta/1?' + query,
                method: 'GET'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    resolve(respuesta);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de consulta ine 360 ::: ");
                if (err.response) {
                    resolve(err.response);
                } else {
                    reject(new Error("Ocurrio un Error con el consumo del servicio de consulta ine 360"));
                }
            }).end();
        });
        return servicio;
    }

    borrar(ine) {
        logger.info(" ::: se consulta servicio rest 360 para borrado de ine :::");
        logger.info("POST: " + JSON.stringify(ine));
    
        var servicio = new Promise((resolve, reject) => {
            var reques = https.request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ine/borra/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    resolve(respuesta);
                });
            }).on("error", err => {
                logger.err(" ::: Ocurrio un Error con el consumo del servico de borrado de 360 ::: ");
                if (err.response) {
                    resolve(err.response);
                } else {
                    reject(new Error("Ocurrio un Error con el consumo del servico de borrado de 360"));
                }
            });
            reques.write(JSON.stringify(ine));
            reques.end();
        });
    
        return servicio;
    }

    actualizaIne(ine) {
        logger.info(" ::: se consulta servicio rest 360 para actualizar ine :::");
        logger.info("POST: " + JSON.stringify(ine));
        var servicio = new Promise((resolve, reject) => {
            var reques = https.request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ine/actualiza/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    resolve(respuesta);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de actualizacion ine 360 ::: ");
                if (err.response) {
                    resolve(err.response);
                } else {
                    reject(new Error("Ocurrio un Error con el consumo del servicio de actualizacion ine 360"));
                }
            });
            reques.write(ine);
            reques.end();
        });
        return servicio;
    }

}

module.exports = Ine;
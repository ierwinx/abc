const logger = require('log4js').getLogger("ListasNegras");
const querystring = require('querystring');
const https = require("https");

class ListasNegras {

    constructor() {
    }

    consulta(bean) {
        logger.info(" ::: Inicia consulta de listas negras:::");

        var arrayfecha = bean.fechaNac.split("/");
        var fecha = arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0];

        var objeto = querystring.stringify({
            nombre: bean.nombre,
            apellido_paterno: bean.apellidoP,
            apellido_materno: bean.apellidoM,
            fecha_nacimiento: fecha
        });

        logger.info('GET: ' + objeto);
        
        var servicio = new Promise((resolve, reject) => {
            https.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: false,
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ln/consulta/1?' + objeto,
                method: 'GET'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta.estatus == 0) {
                        bean.statusLN = true;
                        resolve(bean);
                    } else if (respuesta.estatus == 3) {
                        if (respuesta.error.codigo == "3.1") {
                            bean.statusLN = false;
                            resolve(bean);
                        } else {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio de consulta listas negras 360 ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio de consulta listas negras 360"));
                        }
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio de consulta listas negras 360 ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de consulta listas negras 360"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de consulta listas negras 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de consulta listas negras 360"));
            }).end();
        });
        return servicio;
    }

    alta(bean) {
        logger.info(" ::: Inicia alta de listas negras:::");

        var arrayfecha = bean.fechaNac.split("/");
        var fecha = arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0];

        var objeto = {
            nombre: bean.nombre,
            apellido_paterno: bean.apellidoP,
            apellido_materno: bean.apellidoM,
            fecha_nacimiento: fecha
        };

        logger.info('POST: ' + JSON.stringify(objeto));
        
        var servicio = new Promise((resolve, reject) => {
            var reques = https.request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.token
                },
                rejectUnauthorized: false,
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/ln/alta/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta.estatus == 0) {
                        if (respuesta.respuesta.creado && respuesta.respuesta.id) {
                            bean.idListaNegra = respuesta.respuesta.id;
                            resolve(bean);
                        } else {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio de alta listas negras 360 ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio de alta listas negras 360"));
                        }
                    } else if (respuesta.estatus == 3){
                        logger.error(" ::: Ya se dio de alta en listas negras el usuario ::: ");
                        reject(new Error("Ya se dio de alta en listas negras previamente el usuario"));
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio de alta listas negras 360 ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de alta listas negras 360"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de alta listas negras 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de alta listas negras 360"));
            });
            reques.write(JSON.stringify(objeto));
            reques.end();
        });
        return servicio;
    }

    baja() {

    }

}

module.exports = ListasNegras;
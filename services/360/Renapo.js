const logger = require('log4js').getLogger("Renapo360");
const querystring = require('querystring');
const http = require('http');

class Renapo360 {

    constructor() {
    }

    alta(bean) {
        logger.info(" ::: se consulta servicio rest de 360 para alta renapo :::");

        var objeto = querystring.stringify({
            nombre: bean.nombre,
            apellido_paterno: bean.apellidoP,
            apellido_materno: bean.apellidoM,
            fecha_nacimiento: bean.fechaNac,
            sexo: bean.genero,
            numero_entidad_registro: bean.idEntidadFederativa,
            curp: bean.curp,
        }, null, null, { encodeURIComponent: querystring.unescape });
    
        logger.info("POST: " + objeto);
    
        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + process.env.token
                },
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/renapo/alta/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta && respuesta.estatus !== 0 && respuesta.respuesta.registrado === true) {
                        resolve(bean);
                    } else {
                        logger.error(" ::: Ocurrio un Error con el servicio de Alta RENAPO 360 ::: ");
                        reject(new Error("Ocurrio un Error con el servicio de Alta RENAPO 360"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio alta renapo 360 ::: ");
                reject(new Error("Ocurrio un Error con el servicio alta renapo 360 "));
            });
            reques.write(objeto);
            reques.end();
        });
    
        return servicio;
    }

    consulta(bean) {
        logger.info(" ::: Ise consulta servicio rest de 360 para consulta renapo :::");
 
        var objeto = querystring.stringify({
            curp: bean.curp
        }, null, null, { encodeURIComponent: querystring.unescape });
    
        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + process.env.token
                },
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/renapo/consulta/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    if (respuesta && respuesta.estatus !== 0 && respuesta.respuesta) {
                        resolve(bean);
                    } else {
                        logger.error(" ::: Ocurrio un Error con el servicio de consulta RENAPO 360 ::: ");
                        reject(new Error("Ocurrio un Error con el servicio de consulta RENAPO 360"));
                    }

                    resolve(respuesta.data);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio consulta renapo 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de consulta Renapo 360 "));
            });
            reques.write(objeto);
            reques.end();
        });
    
        return servicio;
    }

    borrar(bean) {
        logger.info(" ::: Ise consulta servicio rest de 360 para consulta renapo :::");
 
        var objeto = querystring.stringify({
            curp: bean.curp
        }, null, null, { encodeURIComponent: querystring.unescape });
    
        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + process.env.token
                },
                hostname: '10.50.108.59',
                port: 443,
                path: '/melian/renapo/borrar/1',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    if (respuesta && respuesta.estatus === 0 && respuesta.respuesta.borrado == true) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio borrar renapo 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de borrar Renapo 360 "));
            });
            reques.write(objeto);
            reques.end();
        });
    
        return servicio;
    }

}

module.exports = Renapo360;
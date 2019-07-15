const logger = require('log4js').getLogger("RenapoCU");
const querystring = require('querystring');
const http = require('http');

class Renapo {

    constructor() {
    }

    alta(bean) {
        logger.info(" ::: se consulta servicio rest de CU para alta renapo CU :::");

        var objeto = querystring.stringify({
            nombre: bean.nombre,
            apellidoPaterno: bean.apellidoP,
            apellidoMaterno: bean.apellidoM,
            fechaNacimiento: bean.fechaNac,
            curp: bean.curp,
            rfc: bean.rfc,
            sexo: bean.genero,
            cveEntidadNacimiento: bean.idEntidadFederativa,
            ipAutenticacion: "127.0.0.1"
        }, null, null, { encodeURIComponent: querystring.unescape });
    
        logger.info("POST: " + objeto);
    
        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                hostname: '10.50.109.33',
                port: 8080,
                path: '/WSClienteUnico/Alta/ambienteRegistroRenapo',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta && respuesta.objResponse && respuesta.issue && respuesta.issue.issue === false && respuesta.objResponse.status === 0) {
                        resolve(bean);
                    } else {
                        logger.error(" ::: Ocurrio un Error con el servicio de Alta RENAPO CU ::: ");
                        reject(new Error("Ocurrio un Error con el servicio de Alta RENAPO CU"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio alta renapo CU ::: ");
                reject(new Error("Ocurrio un Error con el servicio alta renapo CU "));
            });
            reques.write(objeto);
            reques.end();
        });
    
        return servicio;
    }

    consulta(bean) {
        logger.info(" ::: Ise consulta servicio rest de CU para consulta renapo :::");
 
        var objeto = querystring.stringify(requestRenapo, null, null, { encodeURIComponent: querystring.unescape });
    
        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                hostname: '10.50.109.33',
                port: 8080,
                path: '/WSClienteUnico/ClienteUnicoBusca360/buscaPersonaRenapoCURP',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    resolve(respuesta.data);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio alta renapo CU ::: ");
                if (err.response.data) {
                    reject(err.response.data);
                } else {
                    reject(new Error("Ocurrio un Error con el consumo del servicio de consultaRenapoCU 360 "));
                }
            });
            reques.write(objeto);
            reques.end();
        });
    
        return servicio;
    }

}

module.exports = Renapo;
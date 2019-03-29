const logger = require('log4js').getLogger("Consultado");
const querystring = require('querystring');
const https = require("https");

var consultado360 = (objeto) => {
    logger.info(" ::: Inicia consulta cliente CONSULTADO 360 :::");
    
    var query = "";
    if (objeto.icu) {
        query = querystring.stringify({
            tipo_consulta : "icu",
            icu: objeto.icu
        }, null, null, { encodeURIComponent: querystring.unescape });
    } else if (objeto.alias) {
        query = querystring.stringify({
            tipo_consulta : "alias",
            alias: objeto.alias
        }, null, null, { encodeURIComponent: querystring.unescape });
    } else {
        query = querystring.stringify({
            tipo_consulta : "telefono_acertum",
            "ext.acertum.telefono" : objeto.telefono
        }, null, null, { encodeURIComponent: querystring.unescape });
    }

    logger.info("GET: " + query);

    var servicio = new Promise((resolve, reject) => {
        https.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.63.32.44',
            port: 8443,
            path: '/sor/v1/cliente/consulta?' + query,
            method: 'GET'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                logger.info("Respuesta: " + JSON.stringify(respuesta));
                if (respuesta.success != undefined) {
                    if (respuesta.success){
                        objeto.icu = respuesta.respuesta.consultado.cliente.icu;
                        resolve(objeto);
                    } else {
                        logger.info(" ::: El usuario no lo encontro cliente unico  ::: ");
                        reject(new Error("Usuario no encontrado"));
                    }
                } else {
                    logger.info(" ::: Ocurrio un Error con el consumo del servicio de consultado 360  ::: ");
                    reject(new Error("Ocurrio un Error con el consumo del servicio de consultado 360"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el consumo del servicio de consultado 360 ::: ");
            if (err.response) {
                resolve(err.response);
            } else {
                reject(new Error("Ocurrio un Error con el consumo del servicio de consultado 360"));
            }
        }).end();
    });
    return servicio;
}

module.exports = {
    consultado360
}
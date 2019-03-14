var logger = require('log4js').getLogger("Consultado");
var querystring = require('querystring');
var https = require("https");

var consultado360 = (consultadoRequest) => {
    logger.info(" ::: Inicia consulta cliente CONSULTADO 360 :::");
    
    var query = querystring.stringify(consultadoRequest);

    var servicio = new Promise((resolve, reject) => {
        https.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                //"Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.63.32.44',
            port: 8080,
            path: '/sor/v1/cliente/consulta?' + query,
            method: 'GET'
        }, resp => {
            resp.on("data", datos => {
                resolve(JSON.parse(datos).data);
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el consumo del servicio de consultado 360");
            if (err.response.data) {
                resolve(err.response.data);
            } else {
                reject(new Error("Ocurrio un error con el consumo del servicio de consultado 360"));
            }
        }).end();
    });
    return servicio;
}

module.exports = {
    consultado360
}
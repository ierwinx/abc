var logger = require('log4js').getLogger("Desbloqueo");
var https = require("https");

var desbloquea = (objeto) => {
    logger.info(" ::: Inicia desbloqueo cliente 360 :::");

    logger.info('POST ' + JSON.stringify(objeto));
    
    var servicio = new Promise((resolve, reject) => {
        var reques = https.request({
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.50.108.59',
            port: 443,
            path: '/melian/morannon/desbloqueo/1',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                if (respuesta.estatus == 0) {
                    resolve(process.env.e200);
                } else if (respuesta.estatus == 3) {
                    logger.info(respuesta.error.mensaje);
                    reject(new Error(respuesta.error.mensaje));
                } else {
                    logger.error(" ::: Ocurrio un error con el consumo del servicio de desbloqueo 360 ::: ");
                    reject(new Error("Ocurrio un error con el consumo del servicio de desbloqueo 360"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el consumo del servicio de desbloqueo 360 ::: ");
            if (err.response) {
                resolve(err.response);
            } else {
                reject(new Error("Ocurrio un error con el consumo del servicio de desbloqueo 360"));
            }
        });
        reques.write(JSON.stringify(objeto));
        reques.end();
    });
    return servicio;
}

module.exports = {
    desbloquea
}
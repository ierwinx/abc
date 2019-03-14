var logger = require('log4js').getLogger("ActivacionXSuc");
var https = require("https");

var activacionXsuc = (objRequest) => {
    logger.info(" ::: se consulta servicio rest 360 para activacion X sucursal :::");

    var servicio = new Promise((resolve, reject) => {
        var reques = https.request({
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.50.108.59',
            port: 443,
            path: '/melian/morannon/activacion/1',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                resolve(JSON.parse(datos).data);
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el consumo del servicio activacion X sucursal 360");
            if (err.response.data) {
                resolve(err.response.data);
            } else {
                reject(new Error("Ocurrio un error con el consumo del servicio de 360 activacion X sucursal"));
            }
        });
        reques.write(objRequest);
        reques.end();
    });
    return servicio;
}

module.exports = {
    activacionXsuc
}
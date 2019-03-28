const logger = require('log4js').getLogger("ActivacionXSuc");
const https = require("https");

var activacionXsuc = (objeto) => {
    logger.info(" ::: se consulta servicio rest 360 para activacion X sucursal :::");

    var objeto2 = JSON.stringify({
        alnova: objeto.idAlnova,
        email: objeto.correo,
        sucursal: objeto.sucursalCu,
        empleado: objeto.idCliente
    })

    logger.info('POST ' + objeto2);

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
                var respuesta = JSON.parse(datos);
                if (respuesta.estatus == 0) {
                    if (respuesta.respuesta.activacion.datos.alias && respuesta.respuesta.password_temporal) {
                        objeto.alias = respuesta.respuesta.activacion.datos.alias;
                        objeto.password = respuesta.respuesta.password_temporal;
                        resolve(objeto);
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio activacion X sucursal 360 ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de 360 activacion X sucursal"));
                    }
                } else {
                    logger.error(" ::: Ocurrio un Error con el consumo del servicio activacion X sucursal 360 ::: ");
                    reject(new Error("Ocurrio un Error con el consumo del servicio de 360 activacion X sucursal"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el consumo del servicio activacion X sucursal 360 ::: ");
            if (err.response) {
                resolve(err.response);
            } else {
                reject(new Error("Ocurrio un Error con el consumo del servicio de 360 activacion X sucursal"));
            }
        });
        reques.write(objeto2);
        reques.end();
    });
    return servicio;
}

module.exports = {
    activacionXsuc
}
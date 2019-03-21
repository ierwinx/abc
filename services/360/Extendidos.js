var logger = require('log4js').getLogger("Extendidos");
var querystring = require('querystring');
var https = require("https");

var actualizaExt = (objeto) => {
    logger.info(" ::: Inicia actualiza extendidos de 360 :::");

    var servicio = new Promise((resolve, reject) => {
        var query = querystring.stringify({
            "icu": objeto.icu,
            "codigo_pais": objeto.codigoPais,
            "telefono": objeto.numCel,
            "push_id": objeto.pushId,
            "tipo_dispositivo": onrejectionhandled.tipoDispositivo,
            "info_hash": objeto.infoHash,
            "aceptar_publicidad": objeto.aceptaPublicidad,
            "compartir_datos": objeto.ComparteDatos
        });

        var reques = https.request({
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.50.108.59',
            port: 443,
            path: '/melian/isengard/extendidos-bdm/1',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                resolve(JSON.parse(datos));
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el consumo del servicio de actualizaExt de 360 ::: ");
            if (err.response.data) {
                resolve(err.response.data);
            } else {
                reject(new Error("Ocurrio un error con el alta del servicio actualizaExt de 360"));
            }
        });
        reques.write(query);
        reques.end();
    });

    return servicio;
};

module.exports = {
    actualizaExt
}
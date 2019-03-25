const https = require("https");
const logger = require('log4js').getLogger("Borrar");
const querystring = require('querystring');

const borrar = (objeto) => {
    logger.info(" ::: Inicia consulta 360 para borrado de isengard y Morrannon :::");

    var alnova = querystring.stringify({
        alnova : objeto.idAlnova
    });

    logger.info("GET: " + alnova);

    let servicio = new Promise((resolve, reject) => {

        var reques = https.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.50.108.59',
            port: 443,
            path: '/melian/cliente360/borra/1?' + alnova,
            method: 'GET'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                resolve(objeto);
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el consumo del servicio de extendidos de 360 ::: ");
            if (err.response) {
                resolve(err.response);
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
    borrar
}
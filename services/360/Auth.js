var logger = require('log4js').getLogger("Auth");
var datosPeronales = require('../../helpers/datosPersonales');
var encriptar = require('../../helpers/encriptar');
var querystring = require('querystring');
var https = require("https");

var autenticar = () => {
    logger.info(" ::: se consulta servicio rest 360 para autenticacion :::");

    var servicio = new Promise((resolve, reject) => {
        var query = querystring.stringify({
            grant_type: "client_credentials",
            client_id: "e57d172c7173aedcabc16873f00e81cd",
            client_secret: encriptar.cifrar(datosPeronales.concatenaDatos(new Date().getTime(), "172e7f7ba82ec117184da4294b76c9a2"))
        });

        var reques = https.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            rejectUnauthorized: false,
            hostname: '10.63.32.44',
            port: 8446,
            path: '/auth/v4/oauth/token',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                resolve(JSON.parse(datos).access_token);
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el consumo del servicio de alta ine 360");
            reject(new Error("Ocurrio un error con el consumo del servicio de 360 ", err));
        });
        reques.write(query);
        reques.end();
    });

    return servicio;
}

module.exports = {
    autenticar
}
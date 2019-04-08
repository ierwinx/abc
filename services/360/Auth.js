const logger = require('log4js').getLogger("Auth");
const DatosPersonales = require('../../helpers/DatosPersonales');
const Encriptar = require('../../helpers/Encriptar');
const querystring = require('querystring');
const https = require("https");
const Utils = require("../../helpers/Utils");

class Auth {

    constructor() {
    }

    static autenticar() {
        logger.info(" ::: se consulta servicio rest 360 para autenticacion :::");

        var servicio = new Promise((resolve, reject) => {
            var personal = new DatosPersonales();
            var encripta = new Encriptar();
            var query = querystring.stringify({
                grant_type: "client_credentials",
                client_id: process.env.idCliente,
                client_secret: encripta.cifrar(personal.concatenaDatos(new Date().getTime(), process.env.sectretCliente))
            });
    
            var reques = https.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                rejectUnauthorized: Utils.parseBool(process.env.passCertificate),
                hostname: '10.63.32.44',
                port: 8446,
                path: '/auth/v4/oauth/token',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    resolve(JSON.parse(datos).access_token);
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el consumo del servicio de auth 360 ::: ");
                reject(new Error("Ocurrio un Error con el consumo del servicio de auth 360 "));
            });
            reques.write(query);
            reques.end();
        });
    
        return servicio;
    }

}

module.exports = Auth;
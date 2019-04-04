const logger = require('log4js').getLogger("DSI");
const https = require('https');
const soap = require("soap");
const parser = require('fast-xml-parser');

class DSI {

    constructor() {
    }

    validaToken(bearer) {
        logger.info(" ::: se consume servicio para validar sesion frontend con oauth DSI :::");
        var promesa = new Promise((resolve, reject) => {
    
            logger.info("GET: " + bearer)
    
            https.request({
                headers: {
                    "Authorization": bearer
                },
                rejectUnauthorized: false,
                hostname: 'authns.desadsi.gs',
                port: 443,
                path: '/nidp/oauth/nam/tokeninfo',
                method: 'GET'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta.error) {
                        reject(new Error("Token invalido"));
                    } else {
                        resolve(respuesta);
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio de oauth ::: ");
                reject(new Error("Ocurrio un Error al validar token con oauth "));
            }).end();
        });
        return promesa;
    }

    verificaInformacion(usuario) {
        logger.info(" ::: Se consume servicio para validar informacion frontend con oauth DSI :::");
        var servicio = new Promise((resolve, reject) => {
            var url = 'https://portal.socio.gs/wsDatosAuxLogin5/wsDatosAuxiliares.asmx?WSDL';
            
            var args = {
                LlavMaest : usuario
            };
    
            logger.info("SOAP: " + JSON.stringify(args));
            soap.createClient(url, function(err, client) {
                client.DatosAuxiliares(args, function(err2, result) {
                    if (err2 == null) {
                        var respuesta = parser.parse(result.DatosAuxiliaresResult)
                        logger.info("Respuesta: " + JSON.stringify(respuesta))
                        resolve(respuesta);
                    } else {
                        logger.error(" ::: Ocurrio un Error al validar informacion frontend con oauth DSI :::")
                        reject(new Error("Ocurrio un Error al valida token con oauth "));
                    }
                });
            });
        });
        return servicio;
    }
    
}

module.exports = DSI;
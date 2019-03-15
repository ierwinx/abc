var logger = require('log4js').getLogger("DSI");
var https = require('https');
var soap = require("soap");
var parser = require('fast-xml-parser');

var validaToken = (bearer) => {
    logger.info(" ::: se consume servicio para validar sesion frontend con oauth DSI :::");
    var promesa = new Promise((resolve, reject) => {
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
                if (respuesta.error) {
                    reject(new Error("Token invalido"));
                } else {
                    resolve(respuesta);
                }
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el servicio de oauth");
            reject(new Error("Ocurrio un error al validar token con oauth "));
        }).end();
    });
    return promesa;
}

var verificaInformacion = (usuario) => {
    let servicio = new Promise((resolve, reject) => {
        logger.info(" ::: Se consume servicio para validar informacion frontend con oauth DSI :::")
        var url = 'https://portal.socio.gs/wsDatosAuxLogin5/wsDatosAuxiliares.asmx?WSDL';
        
        var args = {
            LlavMaest : usuario
        };

        soap.createClient(url, function(err, client) {
            client.DatosAuxiliares(args, function(err2, result) {
                if (err2 == null) {
                    resolve(creaObjeto(result.DatosAuxiliaresResult));
                } else {
                    reject(new Error("Ocurrio un error al valida token con oauth "));
                }
            });
        });
    });
    return servicio;
}

var creaObjeto = function(xml) {
    var objeto = parser.parse(xml);
    return objeto;
}

module.exports = {
    validaToken,
    verificaInformacion
}
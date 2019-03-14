var logger = require('log4js').getLogger("respuestas");
var uuidv1 = require('uuid/v1');
var UsuarioDAO = require('../daos/usuarioDAO');
var cryptoJs = require('crypto-js');
var oauth = require("../services/OAUTH/dsi");

var printJson = function(res, status, mensaje, object) {
    var aleatorio = Math.floor(Math.random() * 99);

    var json = {
        codigo: status + ".banca_digital-ambientacion_clientes." + aleatorio,
        mensaje: mensaje,
        info: "http://developer.company.com/errors#" + status + ".01." + aleatorio,
        folio: uuidv1()
    }
    if (object !== null) {
        json[object.titulo] = object.objeto
    }
    res.status(status).json(json);
}

var procesaPlantilla = function(html, arreglo) {
    logger.info("::: Se procesan datos para plantilla email :::");
    arreglo.forEach((valor, indice, array) => {
        Object.keys(valor).forEach(key => {
            html = html.replace('{{' + key + '}}', valor[key]);
        });
    });
    return html;
}

var verifyToken = async(req, res, next) => {
    logger.info("::: se valida acceso al sistema :::");
    var header = req.headers['authorization'];
    if (!header) {
        logger.error("::: "+process.env.e400+" :::");
        return printJson(res, 400, process.env.e400, null);
    }
    var bearer = "";
    try {
        var bytes = cryptoJs.AES.decrypt(header, process.env.secret2);
        bearer = bytes.toString(cryptoJs.enc.Utf8);
    } catch(err) {
        logger.error("::: "+process.env.e403+" :::");
        return printJson(res, 403, process.env.e403, null);
    }

    var decoded = await oauth.validaToken(bearer).then().catch(err => {
        return printJson(res, 500, err.message, null);
    });

    var usuario = await UsuarioDAO.buscarNumeroUsuario(decoded.username).then().catch(err => {
        printJson(res, 500, process.env.e500, null);
    });
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    if (ip != "::1") {
        if (usuario.ip != ip) {
            printJson(res, 505, process.env.e505, null);
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = {
    printJson,
    procesaPlantilla,
    verifyToken
}
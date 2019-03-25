const logger = require('log4js').getLogger("respuestas");
const respuestas = require('../helpers/utils');
const usuarioDAO = require("../daos/usuarioDAO");

var filtra = async(req, res) => {
    var token = req.headers['authorization'];
    var ipv4 = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    var ipv6 = req.ip.replace(/^([a-z1-9:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$1');
    var usuario = await usuarioDAO.buscarNumeroUsuario(token);
    if (ipCompleta != "::1") {
        if (ipv4 != usuario.ip) {
            var error = new Error();
            error.name = "Se esta accediendo a una ip no valida";
            error.message = "";
            logger.error(error);
            respuestas.printJson(res, 505, process.env.e505, null);
        }
    }
};

module.exports = {
    filtra
}
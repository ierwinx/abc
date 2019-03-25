const logger = require('log4js').getLogger("desencripta");
const base = require('base-64');
const utf8 = require('utf8');

var base64 = function(datos) {
    logger.info(" ::: Desencripta un string base64 ::: ");
    var bytes = base.decode(datos);
    var texto = utf8.decode(bytes);
    return texto;
}

module.exports = {
    base64
}
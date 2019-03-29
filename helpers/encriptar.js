const logger = require('log4js').getLogger("Encriptar");
const base = require('base-64');
const utf8 = require('utf8');
const crypto = require('crypto');

class Encripta {
    
    constructor() {
    }

    base64(datos) {
        logger.info(" ::: Encripta un string a base64 ::: ");
        var bytes = utf8.encode(datos);
        var encode = base.encode(bytes);
        return encode;
    }

    cifrar(datos) {
        logger.info(" ::: Encripta un string a RSA_PKCS1 y despues a Base 64 ::: ");
        var encode = crypto.publicEncrypt({
            key: process.env.llave360,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(datos)).toString("base64");
        return encode;
    }

}

module.exports = Encripta;
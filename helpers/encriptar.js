const logger = require('log4js').getLogger("Encriptar");
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

class Encripta {
    
    constructor() {
    }

    cifrar(datos) {
        logger.info(" ::: Encripta un string a RSA_PKCS1 y despues a Base 64 ::: ");
        var encode = crypto.publicEncrypt({
            key: process.env.llave360,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(datos)).toString("base64");
        return encode;
    }

    static aes256(texto) {
        logger.info(" ::: Encripta un string a aes256 ::: ");
        var bytes = CryptoJS.AES.encrypt(texto, process.env.secret2);
        var base = CryptoJS.enc.Base64.parse(bytes.toString());
        var hex = base.toString(CryptoJS.enc.Hex);
        return hex;
    }

}

module.exports = Encripta;
const logger = require('log4js').getLogger("Desencripta");
const base = require('base-64');
const utf8 = require('utf8');
const CryptoJS = require('crypto-js');

class Desencripta {
    
    constructor() {
    }

    base64(datos) {
        logger.info(" ::: Desencripta un string base64 ::: ");
        var bytes = base.decode(datos);
        var texto = utf8.decode(bytes);
        return texto;
    }

    static aes256(texto) {
        var bytes = CryptoJS.AES.decrypt(texto, process.env.secret2);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

}

module.exports = Desencripta;
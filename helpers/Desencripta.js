const logger = require('log4js').getLogger("Desencripta");
const CryptoJS = require('crypto-js');

class Desencripta {
    
    constructor() {
    }

    static aes256(texto) {
        logger.info(" ::: Desencripta un texto aes256 a string ::: ");
        var hex = CryptoJS.enc.Hex.parse(texto);
        var base64 = hex.toString(CryptoJS.enc.Base64);
        var aes = CryptoJS.AES.decrypt(base64, process.env.secret2);
        var texto = aes.toString(CryptoJS.enc.Utf8);
        return texto;
    }

}

module.exports = Desencripta;
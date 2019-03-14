var base = require('base-64');
var utf8 = require('utf8');
var crypto = require('crypto');

var base64 = function(datos) {
    var bytes = utf8.encode(datos);
    var encode = base.encode(bytes);
    return encode;
}

var cifrar = function(datos) {
    var encode = crypto.publicEncrypt({
        key: process.env.llave360,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(datos)).toString("base64");
    return encode;
}

module.exports = {
    base64,
    cifrar
}
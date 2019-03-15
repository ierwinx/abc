var token360 = require('../services/360/Auth');
var logger = require('log4js').getLogger("config");

/****************************
 *         Ambiente         *
 ****************************/
process.env.ambiente = 'Desarrollo';
process.env.frontend = 'https://10.51.58.238:4200'
process.env.backend = 'https://10.51.58.240'

/****************************
 *      Puerto escucha      *
 ****************************/
process.env.PORT = 8080;

/****************************
 *      ubicacion Mongo     *
 ****************************/
process.env.mongolocal = 'localhost:27017/ABC2'
process.env.mongoExt = 'devopsuser:devopspwd@10.51.58.241:27017/admin'

/****************************
 *      Email respuestas    *
 ****************************/
process.env.MAIL = "eluz@bancoazteca.com";

/****************************
 *      Codigos Error       *
 ****************************/
process.env.e200 = "Operación realizada exitosamente";
process.env.e201 = "Se ejecuto correctamente la transacción";
process.env.e500 = "Error interno del servidor";
process.env.e505 = "Ip en listas negras";
process.env.e400 = "Token requerido";
process.env.e404 = "Path no encontrado";
process.env.e403 = "Token Inválido";

/****************************
 *      Validaciones       *
 ****************************/
process.env.requerido = "El campo es obligatorio";
process.env.minLongitud = "La longitud minima es de ";
process.env.maxLongitud = "La longitud maxima es de ";
process.env.expReg = "No contiene un formato valido";
process.env.enumerador = "Opción no valida";
process.env.unico = "Ya existe este valor en la base de datos";

/****************************
 *    Llave publica 360     *
 ****************************/
process.env.llave360 = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCToHgIL4qQVh2WLFRb8DGw9Rj5
Et9xCHWSwN+zzXmoo0hEaWxA55JRFi97mmHXO6l0nxexfRZ1bgYdInMxBvuiICF1
H5jxQAKsrZ4ujOte0e6FGqbnoZDTwq4wQLy/FQMY+DKKKTj1CIX67vkgf32kl9k1
rciHDac6tG2/QpPu+wIDAQAB
-----END PUBLIC KEY-----
`;

/****************************
 *    Tiempo expira JWT     *
 ****************************/
process.env.tiempojwt = 300;
process.env.secret = "4mbi3nt4Usu4ri0s";
process.env.secret2 = "secret";

/****************************
 *    Passphrase SSL        *
 ****************************/
process.env.passphrase = "1Qaz2wsx";

/****************************
 *    ambiente sistema      *
 ****************************/
process.env.NODE_ENV === "production"

/****************************
 *    Obtiene token 360     *
 ****************************/
token360.autenticar().then(res => {
    process.env.token = res;
    logger.info("Inicia App ABC correctamente");
}).catch(error => {
    logger.error("Error al obtener token 360");
});
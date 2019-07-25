const Auth = require('../services/360/Auth');
const logger = require('log4js').getLogger("config");

/****************************
 *         Ambiente         *
 ****************************/
process.env.ambiente = 'Desarrollo';
process.env.frontend = 'https://10.51.58.237:8443/abc'
process.env.backend = 'https://10.51.58.240'

/****************************
 *      Puerto escucha      *
 ****************************/
process.env.PORT = 443;

/****************************
 *      ubicacion Mongo     *
 ****************************/
process.env.mongolocal = 'localhost:27017/ABC'
process.env.mongoExt = 'desarrollo:Gruposalinas2019@10.51.58.240:27017/ABC'

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
process.env.e505 = "Ip bloqueada temporalmente";
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
 *    Llaves 360     *
 ****************************/
process.env.llave360 = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCToHgIL4qQVh2WLFRb8DGw9Rj5
Et9xCHWSwN+zzXmoo0hEaWxA55JRFi97mmHXO6l0nxexfRZ1bgYdInMxBvuiICF1
H5jxQAKsrZ4ujOte0e6FGqbnoZDTwq4wQLy/FQMY+DKKKTj1CIX67vkgf32kl9k1
rciHDac6tG2/QpPu+wIDAQAB
-----END PUBLIC KEY-----
`;
process.env.idCliente = "e57d172c7173aedcabc16873f00e81cd";
process.env.sectretCliente = "172e7f7ba82ec117184da4294b76c9a2";

/****************************
 *    Tiempo expira JWT     *
 ****************************/
process.env.tiempojwt = 300;
process.env.secret = "4mbi3nt4Usu4ri0s";
process.env.secret2 = "secret";

/****************************
 *    contra SSL        *
 ****************************/
process.env.contraSSL = "1Qaz2wsx";

/****************************
 *    ambiente sistema      *
 ****************************/
process.env.NODE_ENV = "production"

/****************************
 *    passCertificate      *
 ****************************/
process.env.passCertificate = "false";

/****************************
 *    Obtiene token 360     *
 ****************************/
Auth.autenticar().then(res => {
    process.env.token = res;
    const BloqueoDAO = require("../daos/BloqueoDAO");
    setInterval(async() => {
        logger.info(" ::: Inicia el desbloqueo de ip ::: ");
        var desbloqueo = new BloqueoDAO();
        var lista = await desbloqueo.listar().then().catch(error => {
            logger.error(" ::: Error al obtener listas de ips bloqueadas ::: " + error);
        });
        
        lista.forEach(element => {
            var arreglo = element.hora.split(":");
            var hora = parseInt(arreglo[0]);
            var minutos = parseInt(arreglo[1]);
            var fecha = new Date();
            var horaActual = fecha.getHours();
            if (hora >= horaActual && minutos > 10) {
                desbloqueo.eliminar(element.id).then().catch(error => {
                    logger.error(" ::: Error al desbloquear ips ::: " + error);
                });
            }
        });
        
    }, 300000);
    logger.info(" ::: Inicia App ABC correctamente ::: ");
}).catch(error => {
    logger.error(" ::: Error al obtener token 360 ::: ");
});

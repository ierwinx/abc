const logger = require('log4js').getLogger("Curp");
const querystring = require('querystring');
const http = require('http');

var obtiene = (datos) => {
    logger.info(" ::: Inicia consumo servicio generacion de curp ::: ");
    var arrayfecha = datos.fechaNac.split("/");
    var fecha = arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0];

    var objeto = querystring.stringify({
        nombre: datos.nombre.toUpperCase(),
        apePaterno: datos.apellidoP.toUpperCase(),
        apeMaterno: datos.apellidoM.toUpperCase(),
        fechaNac: fecha,
        genero: cambiaGenreo(datos.genero),
        entidadFed: datos.idEntidadFederativa.length == 2 ? datos.idEntidadFederativa : "0"+ datos.idEntidadFederativa,
        ipAutenticacion: "127.0.0.1",
        usuarioAutenticacion: "USRPRUEBAS"
    }, null, null, { encodeURIComponent: querystring.unescape });

    logger.info('POST ' + objeto);

    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/ClienteUnicoEbankingService/calculaRfcCurp',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                if (respuesta.lstResponse && respuesta.lstResponse[0].curp && respuesta.lstResponse[0].rfc) {
                    datos.curp = respuesta.lstResponse[0].curp
                    datos.rfc = respuesta.lstResponse[0].rfc
                    resolve(datos);
                } else {
                    logger.error(" ::: Ocurrio un error con el servicio genera curp de CU ::: ");
                    reject(new Error("Ocurrio un error con el servicio genera curp de CU "));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el servicio genera curp de CU ::: ");
            reject(new Error("Ocurrio un error con el servicio genera curp de CU "));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

var cambiaGenreo = function(valor) {
    var resp = "H";
    if (valor == "F") {
        resp = "M";
    }
    return resp;
}

module.exports = {
    obtiene
}
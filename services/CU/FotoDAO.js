const logger = require('log4js').getLogger("FotoDAO");
const querystring = require('querystring');
const http = require('http');

var actualizaFoto = async(bean) => {
    logger.info(" ::: se consulta servicio rest de CU para actualizar foto :::");

    var objeto = querystring.stringify({
        pais: bean.pais,
        canal: bean.canal,
        sucursal: bean.sucursal,
        folio: bean.folio,
        nombre: bean.nombre,
        apPaterno: bean.apellidoP,
        apMaterno: bean.apellidoM,
        contenido: bean.foto,
        ipAutenticacion: "127.0.0.1",
        usuarioAutenticacion: "USRPRUEBAS"
    }, null, null, { encodeURIComponent: querystring.unescape });

    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/json"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/ClienteUnicoFotoService/actualizaFoto',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                if (respuesta && respuesta.lstResponse && respuesta.issue && respuesta.issue.issue === false && respuesta.lstResponse[0] && respuesta.lstResponse[0].path) {
                    resolve(bean);
                } else {
                    logger.error(" ::: Ocurrio un Error con el servicio actualizar foto de CU :::");
                    reject(new Error("Ocurrio un Error con el servicio actualizar foto de CU "));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el servicio actualizar foto de CU ::: ");
            reject(new Error("Ocurrio un Error con el servicio actualizar foto de CU "));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

module.exports = {
    actualizaFoto
}
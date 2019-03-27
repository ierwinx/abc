const logger = require('log4js').getLogger("BorradoCTECUDAO");
const querystring = require('querystring');
const http = require('http');

var borrarCteCU = (bean) => {
    logger.info(" ::: se consulta servicio rest para borrado de CU :::");

    let cadenaPost = querystring.stringify({
        nombre: bean.nombre,
        apellidoPaterno: bean.apellidoP,
        apellidoMaterno: bean.apellidoM,
        fechaNacimiento: bean.fechaNac,
        ipAutenticacion: "127.0.0.1"
    }, null, null, { encodeURIComponent: querystring.unescape });

    logger.info('POST ' + cadenaPost);

    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/Baja/clienteDesarrollo',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var resp = JSON.parse(datos);
                if (resp && resp.objResponse && resp.objResponse.status === 0) {
                    resolve(bean);
                } else {
                    logger.error(' ::: Ocurrio un Error con el servicio borrado de CU ::: ')
                    reject(new Error(`Ocurrio un Error con el servicio borrado de CU`));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el servicio borrado de CU ::: ");
            reject(new Error("Ocurrio un Error con el servicio borrado de CU "));
        });
        reques.write(cadenaPost);
        reques.end();
    });

    return servicio;
}

module.exports = {
    borrarCteCU
}
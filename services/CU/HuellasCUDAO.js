const logger = require('log4js').getLogger("HuellasCUDAO");
var querystring = require('querystring');
const http = require('http');


const actualizaHuellas = async(bean) => {
    logger.info(" ::: se consulta servicio rest de CU para actualizar Huellas :::");

    var objeto = querystring.stringify({
        pais: bean.pais,
        canal: bean.canal,
        sucursal: bean.sucursal,
        folio: bean.folio,
        cadena: bean.huella,
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
            path: '/WSClienteUnico/Actualiza/huellasXCU',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                if (respuesta && respuesta.lstResponse && respuesta.issue && respuesta.issue.issue === false && respuesta.lstResponse[0] && respuesta.lstResponse[0].status === 0) {
                    resolve(bean);
                } else {
                    logger.error(" ::: Ocurrio un error con el servicio ACT Huellas de CU ::: ");
                    reject(new Error("Ocurrio un error con el servicio ACT Huellas de CU"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el servicio actualizar Huellas de CU ::: ");
            reject(new Error("Ocurrio un error con el servicio actualizar Huellas de CU ", err));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

module.exports = {
    actualizaHuellas
}
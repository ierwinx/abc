const logger = require('log4js').getLogger("BusquedaCUDAO");
const querystring = require('querystring');
const http = require('http');

var consultaXnombreCU = async(bean) => {
    logger.info(" ::: se consulta servicio rest para consulta por nombre de CU :::");

    var arrayFecha = bean.fechaNac.split("/");
    var fecha = arrayFecha[0] + "-" + arrayFecha[1] + "-" + arrayFecha[2];

    let objeto =  querystring.stringify({
        nombre: bean.nombre,
        apPaterno: bean.apellidoP,
        apMaterno: bean.apellidoM,
        fechaNac: fecha,
        ipAutenticacion: "127.0.0.1",
        usuarioAutenticacion: "USRPRUEBAS"
    }, null, null, { encodeURIComponent: querystring.unescape });

    logger.info("POST : "+objeto);
    
    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/ClienteUnicoCobranzaService/obtenerPorNombre',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var resp = JSON.parse(datos);
                if (resp && resp.lstResponse && resp.issue.issue === false && resp.lstResponse[0].pais && resp.lstResponse[0].canal && resp.lstResponse[0].sucursal && resp.lstResponse[0].folio) {
                    bean.descripcionCte = resp.lstResponse[0].descripcionCte;
                    bean.idAlnova = resp.lstResponse[0].cteAlnova;
                    bean.paisCu = resp.lstResponse[0].pais;
                    bean.canalCu = resp.lstResponse[0].canal;
                    bean.sucursalCu = resp.lstResponse[0].sucursal;
                    bean.folioCu = resp.lstResponse[0].folio;
                    resolve(bean);
                } else {
                    logger.error(" ::: Ocurrio un Error en los datos de entrada de consulta por nombre de CU ::: ");
                    reject(new Error("Ocurrio un Error en los datos de entrada de consulta por nombre de CU"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el servicio consulta por nombre de CU ::: ");
            reject(new Error("Ocurrio un Error con el servicio consulta por nombre de CU ", err));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

var consultaXnombreSoloBusca = async(bean) => {
    logger.info(" ::: se consulta servicio rest para consulta por nombre de CU :::");

    var arrayFecha = bean.fechaNac.split("/");
    var fecha = arrayFecha[0] + "-" + arrayFecha[1] + "-" + arrayFecha[2];

    let objeto = querystring.stringify({
        nombre: bean.nombre,
        apPaterno: bean.apellidoP,
        apMaterno: bean.apellidoM,
        fechaNac: fecha,
        ipAutenticacion: "127.0.0.1",
        usuarioAutenticacion: "USRPRUEBAS"
    }, null, null, { encodeURIComponent: querystring.unescape });
    
    logger.info("POST : "+objeto);
    
    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/ClienteUnicoCobranzaService/obtenerPorNombre',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var resp = JSON.parse(datos);
                if (resp && resp.lstResponse && resp.issue.issue === false && resp.lstResponse.length > 0 ) {
                    bean.statusCU = true;
                    resolve(bean);
                } else {
                    reject(new Error("Usuario no encontrado"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un Error con el servicio consulta por nombre de CU ::: ");
            reject(new Error("Ocurrio un Error con el servicio consulta por nombre de CU "));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

module.exports = {
    consultaXnombreCU,
    consultaXnombreSoloBusca
}
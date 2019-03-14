var logger = require('log4js').getLogger("BusquedaCUDAO");
var querystring = require('querystring');
var http = require('http');

const ligarCuentaCU = async(bean) => {
    logger.info(" ::: se consulta servicio rest de CU para ligar cuenta CU :::");

    var objeto = querystring.stringify({
        bdmId: bean.bdmId,
        cteAlnova: bean.cteAlnova,
        paisGestor: bean.paisGestor,
        canalGestor: bean.canalGestor,
        sucursalGestora: bean.sucursalGestora,
        cuenta: bean.cuenta,
        tipoProducto: bean.tipoProducto,
        tipoSubproducto: bean.tipoSubproducto,
        fechaAlta: bean.fechaAlta,
        ipAutenticacion: '127.0.0.1',
        usuarioAutenticacion: 'USRPRUEBASBD'
    }, null, null, { encodeURIComponent: querystring.unescape });

    var servicio = new Promise((resolve, reject) => {
        var reques = http.request({
            headers: {
                "Content-Type": "application/json"
            },
            hostname: '10.50.109.33',
            port: 8080,
            path: '/WSClienteUnico/ClienteUnicoService/ligaCuentaCU',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var resp = JSON.parse(datos);
                if (resp.data && resp.data.objResponse && resp.data.issue && resp.data.issue.issue === false) {
                    resolve(bean);
                } else {
                    logger.error("Ocurrio un error con el servicio ligarCuentaCU de CU");
                    reject(new error("Ocurrio un error con el servicio ligarCuentaCU de CU"));
                }
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el servicio ligar cuenta  de CU");
            reject(new Error("Ocurrio un error con el servicio ligar cuenta de CU ", err));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

module.exports = {
    ligarCuentaCU
}
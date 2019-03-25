const logger = require('log4js').getLogger("ActualizaPsw");
const https = require('https');

var actualizaPwd = (objeto) => {
    logger.info(" ::: se consulta el servicio rest 360 para actualizar PWS de X usuario ::: ")

    var objetoEn = JSON.stringify({
        icu: objeto.icu,
        new_password: objeto.contra
    });

    logger.info("POST: " + objetoEn);

    var servicio = new Promise((resolve, reject) => {
        var req = https.request({
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.token
            },
            rejectUnauthorized: false,
            hostname: '10.50.108.59',
            port: 443,
            path: '/melian/morannon/actualiza/password/1',
            method: 'POST'
        }, resp => {
            resp.on("data", datos => {
                var respuesta = JSON.parse(datos);
                if (respuesta.estatus == 0) {
                    if (respuesta.respuesta && respuesta.respuesta.actualizo) {
                        objeto.respuesta= "Registro actualizado";
                        resolve(objeto);
                    } else {
                        logger.error(" ::: Ocurrio un error con el consumo del servicio actualizacion de pws X sucursal 360 ::: ");
                        reject(new Error("Ocurrio un error con el consumo del servicio de 360 actualizacion pws X usuario"));
                    }
                } else if (respuesta.estatus == 1) {
                    reject("La nueva contraseña no puede ser igual a la anterior");
                } else {
                    logger.error(" ::: Ocurrio un error con el consumo del servicio actualizacion pws de X usuario 360 ::: ");
                    reject(new Error("Ocurrio un error con el consumo del servicio de 360 actualizacion pws X usuario"));
                }
            });
        }).on("error", err => {
            logger.error(" ::: Ocurrio un error con el consumo del servicio actualizacion pws X usuario 360 ::: ");
            reject(new Error("Ocurrio un error con el consumo del servicio de 360 actualizacion pws X usuario"));

        });
        req.write(objetoEn);
        req.end();

    });

    return servicio;

}

module.exports = {
    actualizaPwd
}

const logger = require('log4js').getLogger("CRUD");
const querystring = require('querystring');
const http = require('http');

class CRUD {

    constructor() {
    }

    alta(bean) {
        logger.info(" ::: se consulta servicio rest de CU para alta de cliente :::");
        var arrayfecha = bean.fechaNac.split("/");
        var fecha = arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0];

        var objeto = querystring.stringify({
            pais: "1",
            canal: "1",
            sucursal: "8757",
            nombre: bean.nombre,
            apePaterno: bean.apellidoP,
            apeMaterno: bean.apellidoM,
            calle: bean.calle,
            numExt: bean.numExt,
            numInt: bean.numInt == undefined ? '' : bean.numInt,
            colonia: bean.colonia,
            cp: bean.cp,
            sexo: bean.genero,
            idTipoPersona: "FI",
            fecNacimiento: fecha,
            poblacion: bean.delegacion,
            estado: bean.estado,
            lada: bean.lada == undefined ? '055' : bean.lada,
            telefonoDomicilio: bean.telefonoDomicilio == undefined ? '55928756' : bean.telefonoDomicilio,
            rfc: bean.rfc,
            extTelefono: "",
            huellaOT1: "",
            manoOT1: "",
            dedoOT1: "",
            cadenaFoto: bean.foto == undefined ? '' : bean.foto,
            idActividad: "0",
            idEstadoCivil: "0",
            idIdentificacion: bean.idIdentificacion == undefined ? bean.idIdentificacion == '' ? '2' : bean.idIdentificacion : bean.idIdentificacion,
            folioIdentificacion: bean.ocr == undefined ? bean.cic == undefined ? "" : bean.cic : bean.ocr == '' ? bean.cic == undefined ? "" : bean.cic  : bean.ocr,
            idNacionalidad: "449",
            curp: bean.curp,
            email: bean.correo,
            manoOT2: "",
            dedoOT2: "",
            huellaOT2: "",
            idEntidadFederativa: bean.idEntidadFederativa,
            idTipoVivienda: "1",
            ipAutenticacion: "127.0.0.1",
            usuarioAutenticacion: 'USRPRUEBAS'
        }, null, null, { encodeURIComponent: querystring.unescape });

        logger.info('POST ' + objeto);

        var servicio = new Promise((resolve, reject) => {
            var reques = http.request({
                headers: {
                    "Content-Type": "application/json"
                },
                hostname: '10.50.109.33',
                port: 8080,
                path: '/WSClienteUnico/ClienteUnicoService/altaCU',
                method: 'POST'
            }, resp => {
                resp.on("data", datos => {
                    var respuesta = JSON.parse(datos);
                    logger.info("Respuesta: " + JSON.stringify(respuesta));
                    if (respuesta && respuesta.lstResponse && respuesta.issue.issue == false && respuesta.lstResponse[0].noClienteAlnova && respuesta.lstResponse[0].icu && respuesta.lstResponse[0].sucursal && respuesta.lstResponse[0].idCliente) {
                        if (respuesta.lstResponse[0].noClienteAlnova != '' && respuesta.lstResponse[0].icu != '' && respuesta.lstResponse[0].icu != null) {
                            bean.idAlnova = respuesta.lstResponse[0].noClienteAlnova;
                            bean.icu = respuesta.lstResponse[0].icu;
                            bean.sucursalCu = respuesta.lstResponse[0].sucursal;
                            bean.idCliente = respuesta.lstResponse[0].idCliente;
                            bean.idCanal = respuesta.lstResponse[0].idCanal
                            resolve(bean);
                        } else {
                            logger.error(" ::: Ocurrio un Error con el servicio de Alta CU ::: ");
                            reject(new Error("Ocurrio un Error con el servicio de Alta CU"));
                        }
                    } else {
                        logger.error(" ::: Ocurrio un Error con el servicio de Alta CU ::: ");
                        reject(new Error("Ocurrio un Error con el servicio de Alta CU"));
                    }
                });
            }).on("error", err => {
                logger.error(" ::: Ocurrio un Error con el servicio alta de cliente de CU ::: ");
                reject(new Error("Ocurrio un Error con el servicio alta de cliente de CU "));
            });
            reques.write(objeto);
            reques.end();
        });

        return servicio;
    }

    borrar(bean) {
        logger.info(" ::: se consulta servicio rest para borrado de CU :::");

        var cadenaPost = querystring.stringify({
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
                    logger.info("Respuesta: " + JSON.stringify(resp));
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

    buscar(bean) {
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
                    logger.info("Respuesta: " + JSON.stringify(resp));
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

    buscarXnombre(bean) {
        logger.info(" ::: se consulta servicio rest para consulta por nombre de CU :::");

        var arrayFecha = bean.fechaNac.split("/");
        var fecha = arrayFecha[0] + "-" + arrayFecha[1] + "-" + arrayFecha[2];

        var objeto = querystring.stringify({
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
                        bean.statusCU = false;
                        resolve(bean);
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

}

module.exports = CRUD;
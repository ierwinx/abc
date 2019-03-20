var logger = require('log4js').getLogger("AltaCUDAO");
var querystring = require('querystring');
var http = require('http');

var altaClienteCU = (beanAltaCU) => {
    logger.info(" ::: se consulta servicio rest de CU para alta de cliente :::");
    var arrayfecha = beanAltaCU.fechaNac.split("/");
    var fecha = arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0];

    var objeto = querystring.stringify({
        pais: "1",
        canal: "1",
        sucursal: "8757",
        nombre: beanAltaCU.nombre,
        apePaterno: beanAltaCU.apellidoP,
        apeMaterno: beanAltaCU.apellidoM,
        calle: beanAltaCU.calle,
        numExt: beanAltaCU.numExt,
        numInt: beanAltaCU.numInt == undefined ? '' : beanAltaCU.numInt,
        colonia: beanAltaCU.colonia,
        cp: beanAltaCU.cp,
        sexo: beanAltaCU.genero,
        idTipoPersona: "FI",
        fecNacimiento: fecha,
        poblacion: beanAltaCU.delegacion,
        estado: beanAltaCU.estado,
        lada: beanAltaCU.lada == undefined ? '055' : beanAltaCU.lada,
        telefonoDomicilio: beanAltaCU.telefonoDomicilio == undefined ? '55928756' : beanAltaCU.telefonoDomicilio,
        rfc: beanAltaCU.rfc,
        extTelefono: "",
        huellaOT1: "",
        manoOT1: "",
        dedoOT1: "",
        cadenaFoto: beanAltaCU.foto == undefined ? '' : beanAltaCU.foto,
        idActividad: "0",
        idEstadoCivil: "0",
        idIdentificacion: beanAltaCU.idIdentificacion == undefined ? '2' : beanAltaCU.idIdentificacion,
        folioIdentificacion: beanAltaCU.ocr == undefined ? beanAltaCU.cic == undefined ? "" : beanAltaCU.cic : beanAltaCU.ocr == '' ? beanAltaCU.cic == undefined ? "" : beanAltaCU.cic  : beanAltaCU.ocr,
        idNacionalidad: "449",
        curp: beanAltaCU.curp,
        email: beanAltaCU.correo,
        manoOT2: "",
        dedoOT2: "",
        huellaOT2: "",
        idEntidadFederativa: beanAltaCU.idEntidadFederativa,
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
                if (respuesta && respuesta.lstResponse && respuesta.issue.issue == false && respuesta.lstResponse[0].noClienteAlnova && respuesta.lstResponse[0].icu && respuesta.lstResponse[0].sucursal && respuesta.lstResponse[0].idCliente) {
                    if (respuesta.lstResponse[0].noClienteAlnova != '' && respuesta.lstResponse[0].icu != '' && respuesta.lstResponse[0].icu != null) {
                        beanAltaCU.idAlnova = respuesta.lstResponse[0].noClienteAlnova;
                        beanAltaCU.icu = respuesta.lstResponse[0].icu;
                        beanAltaCU.sucursalCu = respuesta.lstResponse[0].sucursal;
                        beanAltaCU.idCliente = respuesta.lstResponse[0].idCliente;
                        beanAltaCU.idCanal = respuesta.lstResponse[0].idCanal
                        resolve(beanAltaCU);
                    } else {
                        logger.error("Ocurrio un error con el servicio de Alta CU ");
                        reject(new Error("Ocurrio un error con el servicio de Alta CU"));
                    }
                } else {
                    logger.error("Ocurrio un error con el servicio de Alta CU ");
                    reject(new Error("Ocurrio un error con el servicio de Alta CU"));
                }
            });
        }).on("error", err => {
            logger.error("Ocurrio un error con el servicio alta de cliente de CU");
            reject(new Error("Ocurrio un error con el servicio alta de cliente de CU "));
        });
        reques.write(objeto);
        reques.end();
    });

    return servicio;
}

module.exports = {
    altaClienteCU
}
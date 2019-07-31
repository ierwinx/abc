const logger = require('log4js').getLogger("FlujoINE");
const Ine = require("../services/360/Ine");
const DatosPersonales = require("../helpers/DatosPersonales");

class FlujoINE {

    constructor() {
    }

    static async iniciar(body) {
        logger.info(" ::: se incia Flujo ine en APP:::");

        var objeto = new Object();
        
        if (body.cic && body.ocr) {
            objeto = {
                cic: body.cic,
                ocr: body.ocr,
                numero_emision: body.numeroEmision,
                clave_elector: body.claveElector
            };
        } else {
            if (body.cic) {
                objeto = {
                    cic: body.cic
                };
            } else {
                objeto = {
                    ocr: body.ocr,
                    numero_emision: body.numeroEmision,
                    clave_elector: body.claveElector
                };
            }
        }
        
        
        var ine = new Ine();
        var respuesta1 = await ine.consulta(objeto).then().catch(err => {
            throw err;
        });
    
        if (respuesta1.estatus == 0) {
            var respuesta2 = await ine.borrar(objeto).then().catch(err => {
                throw err;
            });
            if (respuesta2.estatus == 0) {
                if (respuesta2.respuesta.borrado == true) {
                    logger.info(" ::: Se borro la INE correctamente :::");
                } else {
                    logger.error(" ::: Ocurrio un Error en el servicio de borrado 360 INE :::");
                    throw new Error("Ocurrio un error con el consumo del servicio de 360");
                }
            } else {
                logger.error(" ::: Ocurrio un Error en el servicio de borrado 360 INE :::");
                throw new Error("Ocurrio un error con el consumo del servicio de 360");
            }
        }
    
        var objeto2 = new Object();
        
        if (body.cic && body.ocr) {
            objeto2 = {
                cic: body.cic,
                ocr: body.ocr,
                numero_emision: body.numeroEmision,
                clave_elector: body.claveElector,
                nombre: body.nombre,
                apellido_paterno: body.apellidoP,
                apellido_materno: body.apellidoM,
                fecha_nacimiento: FlujoINE.cambiaFecha(body.fechaNac),
                sexo: DatosPersonales.cambiaGenero(body.genero),
                curp: body.curp,
                anio_emision: body.anioEmision == undefined ? '' : body.anioEmision,
                anio_registro: body.anioRegistro == undefined ? '' : body.anioRegistro,
                huella_derecha: body.huella1 == undefined ? '' : body.huella1,
                huella_izquierda: body.huella2 == undefined ? '' : body.huella2,
                situacion_registral: body.situacionRegistral == undefined ? '' : body.situacionRegistral,
                tipo_reporte: body.tipoReporte == undefined ? '' : body.tipoReporte,
                vigencia: body.vigencia
            };
        } else {
            if (body.cic) {
                objeto2 = {
                    cic: body.cic,
                    apellido_paterno: body.apellidoP,
                    apellido_materno: body.apellidoM,
                    fecha_nacimiento: FlujoINE.cambiaFecha(body.fechaNac),
                    sexo: DatosPersonales.cambiaGenero(body.genero),
                    curp: body.curp,
                    anio_emision: body.anioEmision == undefined ? '' : body.anioEmision,
                    anio_registro: body.anioRegistro == undefined ? '' : body.anioRegistro,
                    huella_derecha: body.huella1 == undefined ? '' : body.huella1,
                    huella_izquierda: body.huella2 == undefined ? '' : body.huella2,
                    situacion_registral: body.situacionRegistral == undefined ? '' : body.situacionRegistral,
                    tipo_reporte: body.tipoReporte == undefined ? '' : body.tipoReporte,
                    vigencia: body.vigencia
                };
            } else {
                objeto2 = {
                    ocr: body.ocr,
                    numero_emision: body.numeroEmision,
                    clave_elector: body.claveElector,
                    nombre: body.nombre,
                    apellido_paterno: body.apellidoP,
                    apellido_materno: body.apellidoM,
                    fecha_nacimiento: FlujoINE.cambiaFecha(body.fechaNac),
                    sexo: DatosPersonales.cambiaGenero(body.genero),
                    curp: body.curp,
                    anio_emision: body.anioEmision == undefined ? '' : body.anioEmision,
                    anio_registro: body.anioRegistro == undefined ? '' : body.anioRegistro,
                    huella_derecha: body.huella1 == undefined ? '' : body.huella1,
                    huella_izquierda: body.huella2 == undefined ? '' : body.huella2,
                    situacion_registral: body.situacionRegistral == undefined ? '' : body.situacionRegistral,
                    tipo_reporte: body.tipoReporte == undefined ? '' : body.tipoReporte,
                    vigencia: body.vigencia
                };
            }
        }
    
        var respuesta3 = await ine.alta(objeto2).then().catch(err => {
            throw err;
        });
        if (respuesta3.estatus == 0) {
            if (respuesta3.respuesta.Alta == true) {
                logger.info(" ::: Se dio la alta de INE correctamente :::");

                var objeto2 = new Object();
        
                if (respuesta3.cic && respuesta3.ocr) {
                    objeto2 = {
                        cic: respuesta3.cic,
                        ocr: respuesta3.ocr,
                        numero_emision: respuesta3.numeroEmision,
                        clave_elector: respuesta3.claveElector
                    };
                } else {
                    if (respuesta3.cic) {
                        objeto2 = {
                            cic: respuesta3.cic
                        };
                    } else {
                        objeto2 = {
                            ocr: respuesta3.ocr,
                            numero_emision: respuesta3.numeroEmision,
                            clave_elector: respuesta3.claveElector
                        };
                    }
                }
                
                
                var ine = new Ine();
                var respuesta4 = await ine.consulta(objeto2).then().catch(err => {
                    throw err;
                });

                if (respuesta4.estatus == 0) {
                    logger.info(" ::: Se consulto INE correctamente :::");
                } else {
                    logger.error(" ::: Ocurrio un Error en el servicio de consulta 360 INE :::");
                    throw new Error('Error en la consulta de datos INE en 360');
                }

            } else {
                logger.error(" ::: Ocurrio un Error en el servicio de alta 360 INE :::");
                throw new Error('Error en la alta de datos INE en 360');
            }
        } else {
            logger.error(" ::: Ocurrio un Error en el servicio de alta 360 INE :::");
            throw new Error("Ocurrio un error con el consumo del servicio de 360");
        }
    
        return body;
    }

    static cambiaFecha(fecha) {
        var formato = fecha.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g, '$3-$2-$1');
        return formato;
    }

}

module.exports = FlujoINE;
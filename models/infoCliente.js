const Validator = require("fastest-validator");
const logger = require('log4js').getLogger("InfoCliente");

class InfoCliente {

    constructor() {
        this.v = new Validator({
            messages: {
                required: "El campo '{field}' es requerido",
                stringPattern: "El campo '{field}' no cumple con el formato permitido",
                number: "El campo '{field}' debe ser de tipo numerico",
                numberMin: "El campo '{field}' debe ser mayor o igual a {expected} ",
                numberMax: "El campo '{field}' debe ser menor o igual a {expected}",
                stringMin: "El campo '{field}' debe ser mayor o igual a {expected} ",
                stringMax: "El campo '{field}' debe ser menor o igual a {expected}",
                object: "El campo '{field}' debe ser de tipo Objeto",
                array: "El campo '{field}' debe ser de tipo Array",
                string: "El campo '{field}' debe ser de tipo String",
                enumValue: "El campo '{field}' no permite ese valor ",
                email: "El campo '{field}' no contiene un formato permitido"
            }
        });
        
        this.general = {
            nombre: { 
                type: "string",
                pattern : /^[a-zA-Z ]+/,
                min: 1,
                max: 30
            },
            apellidoP : { 
                type: "string",
                pattern : /^[a-zA-Z ]+/,
                min: 1,
                max: 50
            },
            apellidoM: {
                type: "string",
                pattern : /^[a-zA-Z ]+/,
                optional: true,
                max: 50
            },
            genero: { 
                type: "enum",
                values: ["F", "M"]
            },
            curp: {
                type: "string",
                pattern: /[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/
            },
            rfc: {
                type: "string",
                pattern: /[A-Z&amp;Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/
            }, 
            fechaNac : {
                type: "string",
                pattern: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/
            },
            correo: {
                type: "email"
            },
            numCel: {
                type: "string",
                pattern: /^[0-9]+$/,
                min: 10,
                max: 10
            },
            idEntidadFederativa: {
                type: "number",
                min:0,
                max:33
            }
        };
        
        this.direccion = {
            calle: {
                type: "string",
                max: 70
            },
            numExt: {
                type: "string",
                max: 10
            },
            numInt: {
                type: "string",
                max: 10
            },
            colonia: {
                type: "string",
                max: 70
            },
            delegacion: {
                type: "string",
                max: 70
            },
            estado: {
                type: "string",
                max: 30
            },
            cp: {
                type: "string",
                pattern: /^[0-9]+$/,
                min: 5,
                max: 5
            }
        }
        
        this.ine = {
            anioEmision: {
                type: "string",
                optional: true,
                pattern: /^(\d{4})?$/
            },
            anioRegistro: {
                type: "string",
                optional: true,
                pattern: /^(\d{4})?$/
            },
            situacionRegistral: { 
                type: "enum",
                optional: true,
                values: ["NO_ENCONTRADO", "VIGENTE", "NO_VIGENTE", "REPORTADO", "OTRO"]
            },
            tipoReporte: {
                type: "enum",
                optional: true,
                values: ["NINGUNO", "EXTRAVIO", "ROBO", "EXTRAVIO_TEMPORAL", "ROBO_TEMPORAL", "OTRO"]
            },
            vigencia: {
                type: "string",
                pattern: /^(\d{4})$/
            },
            huella1: {
                type: "string",
                optional: true
            },
            huella2: {
                type: "string",
                optional: true
            },
            fechaNac : {
                type: "string",
                pattern: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/
            },
            nombre: { 
                type: "string",
                min: 1,
                max: 30
            },
            apellidoP : { 
                type: "string",
                min: 1,
                max: 50
            },
            apellidoM: {
                type: "string",
                optional: true,
                max: 50
            },
            genero: { 
                type: "enum",
                values: ["F", "M"]
            },
            curp: {
                type: "string",
                pattern: /[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/
            }
        }
        
        this.ineCic = {
            cic: { 
                type: "string",
                min: 9,
                max: 9
            }
        }
        
        this.ine2Ocr = {
            ocr: { 
                type: "string",
                min: 13,
                max: 13
            },
            numeroEmision: { 
                type: "string",
                pattern: /^(\d{2})?$/
            },
            claveElector: { 
                type: "string",
                max: 18
            },
        }
        
        this.smartphone = {
            idTel: {
                type: "string"
            },
            bdmid: {
                type: "string"
            },
            sisTel: {
                type: "string"
            },
            sisOper: {
                type: "enum",
                values: ["ANDROID", "IOS"]
            },
            latitud: {
                type: "string"
            },
            longitud: {
                type: "string"
            }
        
        }
        
        this.icus = {
            icu: {
                type: "string",
                min: 32,
                max: 32
            }
        }
        
        this.alias = {
            alias: {
                type: "string",
                min: 1
            }
        }
        
        this.telefonoAcertum = {
            numCel: {
                type: "string",
                min: 10,
                max: 10
            }
        }
        
        this.contras = {
            contra: {
                type: "string",
                min: 8,
                max: 49
            }
        }
        
        this.crear = {
            nombre: { 
                type: "string",
                min: 1,
                max: 30
            },
            apellidoP : { 
                type: "string",
                min: 1,
                max: 50
            },
            apellidoM: {
                type: "string",
                optional: true,
                max: 50
            }
        }
        
        this.ln360 = {
            nombre: { 
                type: "string",
                min: 1,
                max: 30
            },
            apellidoP : { 
                type: "string",
                min: 1,
                max: 50
            },
            apellidoM: {
                type: "string",
                optional: true,
                max: 50
            },
            fechaNac : {
                type: "string",
                pattern: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/
            }
        }

        this.renapo = {
            nombre: { 
                type: "string",
                min: 1,
                max: 30
            },
            apellidoP : { 
                type: "string",
                min: 1,
                max: 50
            },
            apellidoM: {
                type: "string",
                optional: true,
                max: 50
            },
            fechaNac : {
                type: "string",
                pattern: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/
            },
            curp: {
                type: "string",
                pattern: /[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/
            },
            rfc: {
                type: "string",
                pattern: /[A-Z&amp;Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/
            },
            genero: { 
                type: "enum",
                values: ["F", "M"]
            },
            idEntidadFederativa: {
                type: "number",
                min:0,
                max:33
            }
        };

    }

    principales(datos) {
        logger.info(" ::: Se valida Datos princiales :::");
        var check = this.v.compile(this.general);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    direcciones(datos) {
        logger.info(" ::: Se valida la direccion :::");
        var check = this.v.compile(this.direccion);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    ife(datos) {
        logger.info(" ::: Se valida INE :::");
        var check;
        var check2;
        if (datos.cic) {
            logger.info(" ::: Validacion con CIC ::: ");
            check = this.v.compile(this.ine);
            check2 = this.v.compile(this.ineCic);
        } else {
            logger.info(" ::: Validacion con OCR :::");
            check = this.v.compile(this.ine);
            check2 = this.v.compile(this.ine2Ocr);
        }
        var respuesta = check(datos);
        var respuesta2 = check2(datos);
        var respuesta3 = new Array();
        if (typeof(respuesta) == 'object') {
            respuesta3 = respuesta;
        }
        if (typeof(respuesta2) == 'object') {
            respuesta2.forEach(element => {
                respuesta3.push(element);
            });
        }
        if (respuesta3.length > 0) {
            throw respuesta3;
        }
    }

    telefono(datos) {
        logger.info(" ::: Se valida datos de smartphones :::");
        var check = this.v.compile(this.smartphone);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    consulta(datos) {
        logger.info(" ::: Se valida datos de ICU o ALIAS:::");
        var check1 = this.v.compile(this.icus);
        var check2 = this.v.compile(this.alias);
        var check3 = this.v.compile(this.telefonoAcertum);
        var respuesta1;
        var respuesta2;
        var respuesta3;
        var respuesta4 = new Array();
        if (datos.icu == undefined && datos.alias == undefined && datos.telefono == undefined) {
            respuesta1 = check1(datos);
            respuesta2 = check2(datos);
            respuesta3 = check3(datos);

            respuesta4.push(respuesta1[0]);
            respuesta4.push(respuesta2[0]);
            respuesta4.push(respuesta3[0]);

            if (respuesta4.length > 0) {
                throw respuesta4;
            }
        } else {

            if (datos.icu == '') {
                respuesta1 = check1(datos);
                if (typeof(respuesta1) == 'object') {
                    throw respuesta1;
                }
            }

            if (datos.alias == '') {
                respuesta2 = check2(datos);
                if (typeof(respuesta2) == 'object') {
                    throw respuesta2;
                }
            }

            if (datos.telefono == '') {
                respuesta3 = check3(datos);
                if (typeof(respuesta3) == 'object') {
                    throw respuesta3;
                }
            }

        }
        
    }

    validContra(datos) {
        logger.info(" ::: Se valida que venga una contra :::");
        var check = this.v.compile(this.contras);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    listasNegras(datos) {
        logger.info(" ::: Se valida que tenga datos ln :::");
        var check = this.v.compile(this.ln360);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    datosRenapo(datos) {
        logger.info(" ::: Se valida que tenga datos ln :::");
        var check = this.v.compile(this.renapo);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    iteraInfo(datos, flujo) {
        if (datos.length > 0) {
            datos.forEach(element => {
                this.validaFlujo(element, flujo);
            });
        } else {
            this.validaFlujo(datos, flujo);
        }
    }

    validaFlujo(datos, flujo) {
        switch(flujo) {
            case 1:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.1:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.2:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.3:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.4:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.5:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.6:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.7:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.8:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.9:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 1.11:
                this.principales(datos);
                this.direcciones(datos);
                this.ife(datos);
                break;
            case 1.12:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 2:
                this.principales(datos);
                this.ife(datos);
                break;
            case 2.1:
                this.principales(datos);
                this.ife(datos);
                break;
            case 2.3:
                this.principales(datos);
                break;
            case 2.4:
                this.principales(datos);
                this.ife(datos);
                break;
            case 3:
                this.principales(datos);
                this.telefono(datos);
                this.direcciones(datos);
                break;
            case 3.1:
                this.principales(datos);
                this.telefono(datos);
                this.direcciones(datos);
                break;
            case 3.4:
                this.principales(datos);
                this.telefono(datos);
                this.direcciones(datos);
                break;
            case 3.4:
                this.principales(datos);
                this.telefono(datos);
                this.direcciones(datos);
                break;
            case 4:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 5:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 6:
                this.principales(datos);
                this.direcciones(datos);
                break;
            case 7:
                this.datosRenapo(datos);
                break;
            case 7.1:
                this.consulta(datos);
                break;
            case 7.2:
                this.consulta(datos);
                this.validContra(datos);
                break;
            case 7.3:
                this.listasNegras(datos);
                break;
            case 7.4:
                this.ife(datos);
                break;
        }
    }

    crearUsuario(datos) {
        logger.info(" ::: Se verifica se se crea un cliente desde base de datos con datos reales o no :::");
        var resp = false;
        var check = this.v.compile(this.crear);
        var respuesta = check(datos);
        if (typeof(respuesta) != 'object') {
            resp = true;
        }
        return resp;
    }

}

module.exports = InfoCliente;
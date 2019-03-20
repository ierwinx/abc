let Validator = require("fastest-validator");
var logger = require('log4js').getLogger("InfoCliente");

let v = new Validator({
    messages: {
        required: "El campo '{field}' es requerido",
        stringPattern: "El campo '{field}' no cumple con el formato permitido",
        number: "El campo '{field}' debe ser de tipo numerico",
        numberMin: "El campo '{field}' debe ser mayor o igual a {expected} ",
        numberMax: "El campo '{field}' debe ser menor o igual a {expected}",
        stringMin: "El campo '{field}' debe ser mayor o igual a {expected} ",
        stringMax: "El campo '{field}' debe ser menor o igual a {expected}",
        object: "El campo '{field}' debe ser de tipo Objeto",
        number: "El campo '{field}' debe ser de tipo Numerico",
        array: "El campo '{field}' debe ser de tipo Array",
        string: "El campo '{field}' debe ser de tipo String",
        enumValue: "El campo '{field}' no permite ese valor "
    }
});

const general = {
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
        type: "string",
        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    numCel: {
        type: "string",
        pattern: /^[0-9]+$/,
        min: 10,
        max: 10
    },
    idEntidadFederativa: {
        type: "number",
        min: 0,
        max: 33
    }
};

const direccion = {
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
        type: "string"
    },
    cp: {
        type: "string",
        pattern: /^[0-9]+$/,
        min: 5,
        max: 5
    }
}

const ine = {
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
        type: "string",
        optional: true,
    },
    tipoReporte: { 
        type: "string",
        optional: true,
    },
    vigencia: {
        type: "string",
        pattern: /^(\d{4})$/
    }
}

const ineCic = {
    cic: { 
        type: "string",
        min: 9,
        max: 9
    }
}

const ine2Ocr = {
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
        type: "string"
    },
}

const smartphone = {
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

const icus = {
    icu: {
        type: "string",
        min: 32,
        max: 32,
        pattern: /^([0-9]+)?$/
    }
}

const crear = {
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

var principales = (datos) => {
    logger.info(" ::: Se valida Datos princiales :::");
    var check = v.compile(general);
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        throw respuesta;
    }
}

var direcciones = (datos) => {
    logger.info(" ::: Se valida la direccion :::");
    var check = v.compile(direccion);
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        throw respuesta;
    }
}

var ife = (datos) => {
    logger.info(" ::: Se valida INE :::");
    var check;
    var check2;
    if (datos.cic) {
        logger.info(" ::: Validacion con CIC ::: ");
        check = v.compile(ine);
        check2 = v.compile(ineCic);
    } else {
        logger.info(" ::: Validacion con OCR :::");
        check = v.compile(ine);
        check2 = v.compile(ine2Ocr);
    }
    var respuesta = check(datos);
    var respuesta2 = check2(datos);
    var respuesta3 = new Array();
    if (respuesta.length > 0) {
        respuesta3 = respuesta;
    }
    if (respuesta2.length > 0) {
        respuesta3.push(respuesta3);
    }
    if (respuesta3.length > 0) {
        throw respuesta3;
    }
}

var telefono = (datos) => {
    logger.info(" ::: Se valida datos de smartphones :::");
    var check = v.compile(smartphone);
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        throw respuesta;
    }
}

var desbloqueo = (datos) => {
    logger.info(" ::: Se valida datos de ICU :::");
    var check = v.compile(icus);
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        throw respuesta;
    }
}

var validaFlujo = (datos, flujo) => {

    switch(flujo) {
        case 1:
            principales(datos);
            direcciones(datos);
            break;
        case 1.1:
            principales(datos);
            direcciones(datos);
            break;
        case 1.2:
            principales(datos);
            direcciones(datos);
            break;
        case 1.3:
            principales(datos);
            direcciones(datos);
            break;
        case 1.4:
            principales(datos);
            direcciones(datos);
            break;
        case 1.5:
            principales(datos);
            direcciones(datos);
            break;
        case 1.6:
            principales(datos);
            direcciones(datos);
            break;
        case 1.7:
            principales(datos);
            direcciones(datos);
            break;
        case 1.8:
            principales(datos);
            direcciones(datos);
            break;
        case 1.9:
            principales(datos);
            direcciones(datos);
            break;
        case 1.10:
            principales(datos);
            direcciones(datos);
            break;
        case 1.11:
            principales(datos);
            direcciones(datos);
            break;
        case 2:
            principales(datos);
            ife(datos);
            break;
        case 2.1:
            principales(datos);
            ife(datos);
            break;
        case 2.3:
            principales(datos);
            break;
        case 2.4:
            principales(datos);
            ife(datos);
            break;
        case 3:
            principales(datos);
            telefono(datos);
            direcciones(datos);
            break;
        case 3.1:
            principales(datos);
            telefono(datos);
            direcciones(datos);
            break;
        case 3.4:
            principales(datos);
            telefono(datos);
            direcciones(datos);
            break;
        case 3.4:
            principales(datos);
            telefono(datos);
            direcciones(datos);
            break;
        case 4:
            principales(datos);
            direcciones(datos);
            break;
        case 5:
            principales(datos);
            direcciones(datos);
            break;
        case 6:
            principales(datos);
            direcciones(datos);
            break;
        case 7:
            principales(datos);
            break;
        case 7.1:
            desbloqueo(datos);
            break;
    }
}


var CrearUsuario = function(datos) {
    logger.info(" ::: Se verifica se se crea un cliente desde base de datos con datos reales o no :::");
    var resp = false;
    var check = v.compile(crear);
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        resp = true;
    }
    return resp;
}

module.exports = {
    principales,
    direcciones,
    ife,
    telefono,
    validaFlujo,
    desbloqueo,
    CrearUsuario
}
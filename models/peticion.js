let Validator = require("fastest-validator");
var logger = require('log4js').getLogger("Entrada");

let v = new Validator({
    messages: {
        required: "El campo '{field}' es requerido",
        stringPattern: "El campo '{field}' no cumple con el formato permitido",
        number: "El campo '{field}' debe ser de tipo numerico",
        numberMin: "El campo '{field}' debe ser mayor o igual a {expected} ",
        numberMax: "El campo '{field}' debe ser menor o igual a {expected}",
        object: "El campo '{field}' debe ser de tipo Objeto",
        number: "El campo '{field}' debe ser de tipo Numerico",
        array: "El campo '{field}' debe ser de tipo Array",
        string: "El campo '{field}' debe ser de tipo String"
    }
});

const schema = {
    flujo: { 
        type: "number"
    },
    numUsuarios : { 
        type: "number", 
        min: 1, 
        max: 20 
    },
    caracteristicas: {
        type: "array",
        empty: true,
        items: {
            type: "number"
        }
    },
    infoCliente: { 
        type: "array", 
        empty: true,
        items: { 
            type: "object"
        }
    },
    usuarioLogin: {
        type: "string", 
        optional: true,
        pattern: /^[0-9]+$/
    }
};

var check = v.compile(schema);

var valida = (datos) => {
    logger.info(" ::: Se valida JSON entrada :::");
    var respuesta = check(datos);
    if (respuesta.length > 0) {
        throw respuesta;
    }
}

module.exports = {
    valida
}
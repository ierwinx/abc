const Validator = require("fastest-validator");
const logger = require('log4js').getLogger("peticion");

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
        string: "El campo '{field}' debe ser de tipo String",
        email: "El campo '{field} no cumple con un formato correcto'"
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
        pattern: /^[0-9]+$/
    }
};

const schema2 = {
    id: {
        type: "string"
    }
}

const usuarios = {
    usuario: {
        type: "string",
        pattern: /^[0-9]+$/
    },
    correo: {
        type: "email"
    }
}

class Peticion {

    constructor() {
    }

    static valida(datos) {
        logger.info(" ::: Se valida JSON entrada :::");
        var check = v.compile(schema);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    static valida2(datos) {
        logger.info(" ::: Se valida JSON entrada :::");
        var check = v.compile(schema2);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

    static valida3(datos) {
        logger.info(" ::: Se valida JSON entrada :::");
        var check = v.compile(usuarios);
        var respuesta = check(datos);
        if (typeof(respuesta) == 'object') {
            throw respuesta;
        }
    }

}

module.exports = Peticion;
const mongoose = require('../config/ConexionDB');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var cliente = new Schema({
    flujo: {
        type: Number,
        required: [true, process.env.requerido]
    },
    icu: String,
    nombre: {
        type: String,
        required: [true, process.env.requerido],
        match: [/^[a-zA-Z0-9 ]+/, process.env.expReg],
        minlength: [1, process.env.minLongitud + '1'],
        maxlength: [30, process.env.maxlength + '30']
    },
    apellidoP: {
        type: String,
        required: [true, process.env.requerido],
        match: [/^[a-zA-Z0-9 ]+/, process.env.expReg],
        minlength: [1, process.env.minLongitud + '1'],
        maxlength: [50, process.env.maxlength + '50']
    },
    apellidoM: {
        type: String,
        required: [false, process.env.requerido],
        match: [/^[a-zA-Z0-9 ]+/, process.env.expReg],
        minlength: [0, process.env.minLongitud + '0'],
        maxlength: [50, process.env.maxlength + '50']
    },
    genero: {
        type: String,
        required: [true, process.env.requerido],
        enum: {
            values: ['F', 'M'],
            message: process.env.enumerador
        }
    },
    numCel: {
        type: String,
        required: [true, process.env.requerido],
    },
    telefonoDomicilio: String,
    correo: {
        type: String,
        required: [true, process.env.requerido],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, process.env.expReg]
    },
    curp: {
        type: String,
        required: [true, process.env.requerido],
        match: [/[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/, process.env.expReg]
    },
    rfc: {
        type: String,
        required: [true, process.env.requerido],
        match: [/[A-Z&amp;Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/, process.env.expReg]
    },
    fechaNac: {
        type: String,
        required: [true, process.env.requerido]
    },
    idIdentificacion: String,
    ocr: String,
    calle: {
        type: String,
        required: [true, process.env.requerido]
    },
    numExt: {
        type: String,
        required: [true, process.env.requerido]
    },
    numInt: {
        type: String,
        required: [false, process.env.requerido]
    },
    cp: {
        type: String,
        required: [true, process.env.requerido],
        minlength: [5, process.env.minLongitud + '5'],
        maxlength: [6, process.env.maxLongitud + '6']
    },
    colonia: {
        type: String,
        required: [true, process.env.requerido]
    },
    delegacion: {
        type: String,
        required: [true, process.env.requerido]
    },
    idEntidadFederativa: {
        type: String,
        required: [true, process.env.requerido]
    },
    paisCu: String,
    canalCu: String,
    sucursalCu: String,
    folioCu: String,
    tipoCte: String,
    descripcionCte: String,
    idAlnova: String,
    idNegocio: String,
    idCanal: String,
    idCliente: String,
    digVer: String,
    usuario: String,
    password: String,
    token: String,
    foto: String,
    huella1: String,
    mano1: String,
    dedo1: String,
    idNacionalidad: String,
    cveEntidadNacimiento: String,
    usuarioLogin: String,
    estatusCliente: Boolean,
    nivelCte: String,
    estado: String,
    cic : String,
    numeroEmision : String,
    claveElector: String,
    vigencia: String,
    descFlujo: String,
    cuentaCliente: String,
    alias: String
}, {
    toJSON: {
        transform: (doc, ret, game) => {
            delete ret.__v;
            ret.idAbc = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.usuarioLogin;
        }
    }
});

cliente.plugin(beautifyUnique);

module.exports = mongoose.model('cliente', cliente);
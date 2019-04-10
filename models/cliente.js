const mongoose = require('../config/ConexionDB');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var cliente = new Schema({
    flujo: {
        type: Number,
        required: [false, process.env.requerido]
    },
    icu: String,
    nombre: {
        type: String,
        required: [false, process.env.requerido]
    },
    apellidoP: {
        type: String,
        required: [false, process.env.requerido]
    },
    apellidoM: {
        type: String,
        required: [false, process.env.requerido]
    },
    genero: {
        type: String,
        required: [false, process.env.requerido],
        enum: {
            values: ['F', 'M'],
            message: process.env.enumerador
        }
    },
    numCel: {
        type: String,
        required: [false, process.env.requerido],
    },
    telefonoDomicilio: String,
    correo: {
        type: String,
        required: [false, process.env.requerido]
    },
    curp: {
        type: String,
        required: [false, process.env.requerido]
    },
    rfc: {
        type: String,
        required: [false, process.env.requerido]
    },
    fechaNac: {
        type: String,
        required: [false, process.env.requerido]
    },
    idIdentificacion: String,
    ocr: String,
    calle: {
        type: String,
        required: [false, process.env.requerido]
    },
    numExt: {
        type: String,
        required: [false, process.env.requerido]
    },
    numInt: {
        type: String,
        required: [false, process.env.requerido]
    },
    cp: {
        type: String,
        required: [false, process.env.requerido]
    },
    colonia: {
        type: String,
        required: [false, process.env.requerido]
    },
    delegacion: {
        type: String,
        required: [false, process.env.requerido]
    },
    idEntidadFederativa: {
        type: String,
        required: [false, process.env.requerido]
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
    alias: String,
    idListaNegra: String,
    fecha: Date
}, {
    toJSON: {
        transform: (doc, ret, game) => {
            delete ret.__v;
            ret.idAbc = ret._id;
            delete ret._id;
            delete ret.usuarioLogin;
        }
    }
});

cliente.plugin(beautifyUnique);

module.exports = mongoose.model('cliente', cliente);
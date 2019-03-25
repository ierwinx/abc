const mongoose = require('../config/database');

var Schema = mongoose.Schema;

var persona = new Schema({
    nombre: String,
    apPaterno: String,
    apMaterno: String,
    curp: String,
    rfc: String,
    ocr: String,
    fechaNacimiento: String,
    email: String,
    ladaCel: String,
    celular: String,
    ladaCasa: String,
    telCasa: String,
    calle: String,
    numExt: String,
    numInt: String,
    colonia: String,
    delegacion: String,
    estado: String,
    cp: String,
    idIdentificacion: String,
    nacionalidad: String,
    idNacionalidad: String,
    cveEntidadNacimiento: String,
    foto: String,
    huella: String,
    mano: String,
    dedo: String,
    ocupacion: String,
    idOcupacion: String,
    idlugarNac: String,
    estadoCivil: String,
    genero: String,
    zonificacion: {
        latitud: String,
        longitud: String
    },
    ingresos: String,
    claveElector: String,
    numeroEmision: String,
    cic: String,
    vigencia: String,
    anioRegistro : String,
    vigencia: String
}, {
    toObject: {
        transform: (doc, ret, game) => {
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('persona', persona);
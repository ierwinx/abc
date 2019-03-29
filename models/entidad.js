const mongoose = require('../config/ConexionDB');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var entidad = new Schema({
    id: {
        type: String,
        required:[true, process.env.requerido],
        unique: process.env.unico
    },
    nombre: {
        type: String,
        required: [true, process.env.requerido]
    },
    abre: {
        type: String,
        required: [true, process.env.requerido],
        unique: process.env.unico
    }
}, {
    toObject: {
        transform: (doc, ret, game) => {
            delete ret._id;
            delete ret.__v;
        }
    }
});

entidad.plugin(beautifyUnique);

module.exports = mongoose.model('entidad', entidad);
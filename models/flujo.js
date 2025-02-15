const mongoose = require('../config/ConexionDB');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var flujo = new Schema({
    idFlujo: {
        type: Number,
        required:[true, process.env.requerido]
    },
    nombreFlujo: {
        type: String,
        required:[true, process.env.requerido],
        maxlength: [50, process.env.maxLongitud + '50']
    },
    descripcion: {
        type: String,
        required:[true, process.env.requerido],
        maxlength: [100, process.env.maxLongitud + '100']
    },
    servicios: [Number],
    status: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform: (doc, ret, game) => {
            delete ret.__v;
            delete ret._id;
            delete ret.servicios;
        }
    }
});

flujo.plugin(beautifyUnique);

module.exports = mongoose.model('flujo', flujo);
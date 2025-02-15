const mongoose = require('../config/ConexionDB');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var caracteristica = new Schema({
    id:{
        type: Number,
        required: [true, process.env.requerido]
    },
    descripcion: {
        type: String,
        required: [true, process.env.requerido],
        maxlength: [50, process.env.maxLongitud + '50']
    },
    flujosCompatibles: [Number],
    nvEjecucion: Number,
    status: {
        type: Boolean,
        default: false
    },
    idServicio: Number
}, {
    toJSON: {
        transform: (doc, ret, game) => {
            delete ret.__v;
            delete ret._id;
            delete ret.flujosCompatibles;
            delete ret.nvEjecucion;
        }
    }
});

caracteristica.plugin(beautifyUnique);

module.exports = mongoose.model('caracteristica', caracteristica);
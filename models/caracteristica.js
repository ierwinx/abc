const mongoose = require('../config/database');
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
    toObject: {
        transform: (doc, ret, game) => {
            delete ret.__v;
            delete ret._id;
        }
    }
});

caracteristica.plugin(beautifyUnique);

module.exports = mongoose.model('caracteristica', caracteristica);
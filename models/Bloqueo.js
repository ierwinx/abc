const mongoose = require('../config/ConexionDB');

var Schema = mongoose.Schema;

var bloqueo = new Schema({
    ip:{
        type: String
    },
    hora: {
        type: String
    },
    contador: {
        type: Number,
        default: 1
    }
}, {
    toJSON: {
        transform: (doc, ret, game) => {
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('bloqueo', bloqueo);
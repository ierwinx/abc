const mongoose = require('../config/database');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;

var user = new Schema({
    usuario: {
        type: String,
        required:[true, process.env.requerido]
    },
    correo: {
        type: String,
        required: [true, process.env.requerido],
        unique: process.env.unico,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, process.env.expReg]
    },
    status: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        required: [true, process.env.requerido],
        unique: process.env.unico,
        match: [/^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$/, process.env.expReg]
    }
}, {
    toObject: {
        transform: (doc, ret, game) => {
            delete ret.__v;
        }
    }
});

user.plugin(beautifyUnique);

module.exports = mongoose.model('usuario', user);
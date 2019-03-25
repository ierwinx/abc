const mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.mongolocal, { useCreateIndex: true, useNewUrlParser: true }, function(error, datos) {
    if (error) {
        throw error;
    }
});

module.exports = mongoose;
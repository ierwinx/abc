var logger = require('log4js').getLogger("Home");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    logger.info(" ::: Peticion inicio para aceptar certificado ::: ");
    res.render('home', {numeros:[1,2,3], nombre:"erwin",  personas: [{nombre:"juan", edad:13},{nombre:"Pepe", edad:25}]});
});

router.get('/testHandlebars', function(req, res, next) {
    var obj = {
        numeros: [1,2,3],
        nombre:"erwin",
        personas: [
            {nombre:"juan", edad:13},
            {nombre:"Pepe", edad:25}
        ]
    };
    
    var val = [true, false];

    if (val[Math.floor(Math.random() * 2)]) {
        obj.perro = "cachorro";
    }

    res.render('home2', obj);
});

module.exports = router;

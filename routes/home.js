const logger = require('log4js').getLogger("Home");
const express = require('express');
const router = express.Router();
const desbloqueo = require('../services/360/Desbloqueo')

router.get('/', function(req, res, next) {
    logger.info(" ::: Peticion inicio para aceptar certificado ::: ");
    res.render('home', {numeros:[1,2,3], nombre:"erwin",  personas: [{nombre:"juan", edad:13},{nombre:"Pepe", edad:25}]});
});

router.get('/testHandlebars', function(req, res, next) {
    var val = [true, false];
    var obj = {
        numeros: [1,2,3],
        nombre:"erwin",
        personas: [
            {nombre:"juan", edad:13},
            {nombre:"Pepe", edad:25}
        ],
        valida: val[Math.floor(Math.random() * 2)],
        perro: "cachorro"
    };
    res.render('home2', obj);
});

router.get('/test', (req, res, next) => {
    res.json({});
});

module.exports = router;

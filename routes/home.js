const logger = require('log4js').getLogger("Home");
const express = require('express');
const router = express.Router();
const desbloqueo = require('../services/360/Desbloqueo')

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

router.get('/test', (req, res, next) => {
    desbloqueo.desbloquea({icu:"4529323a48cb2f4c32fc5a912b866110"}).then(data => {
        res.json(data);
    }).catch(err => {
        res.json({error:err.message});
    });
});

module.exports = router;

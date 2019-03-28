const logger = require('log4js').getLogger("Home");
const express = require('express');
const router = express.Router();
const PruebaClase = require('../helpers/PruebaClase');

router.get('/', function(req, res, next) {
    logger.info(" ::: Peticion inicio para aceptar certificado ::: ");
    res.render('home', { url:process.env.frontend });
});

module.exports = router;

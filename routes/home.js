const logger = require('log4js').getLogger("Home");
const express = require('express');
const router = express.Router();
const Encriptar = require("../helpers/Encriptar");
const Desencriptar = require("../helpers/Desencripta");
const UsuariosDAO = require("../daos/UsuarioDAO");

router.get('/', function(req, res, next) {
    logger.info(" ::: Peticion inicio para aceptar certificado ::: ");
    res.render('home', { url:process.env.frontend });
});

module.exports = router;

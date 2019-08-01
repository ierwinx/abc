const logger = require('log4js').getLogger("Home");
const express = require('express');
const router = express.Router();
const Encriptar = require("../helpers/Encriptar");
const Desencriptar = require("../helpers/Desencripta");
const UsuariosDAO = require("../daos/UsuarioDAO");

router.get('/', function(req, res, next) {
    logger.info(" ::: Peticion inicio para aceptar certificado ::: ");
    res.render('home', { url: req.query.url });
});

router.get('/Encriptar', function(req, res, next) {
    res.send(Encriptar.aes256(req.body));
});

router.get('/Desencriptar', function(req, res, next) {
    res.send(Desencriptar.aes256(req.body));
});

module.exports = router;

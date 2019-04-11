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

router.get('/Encriptar', function(req, res, next) {
    res.send(Encriptar.aes256(req.body));
});

router.get('/Desencriptar', function(req, res, next) {
    res.send(Desencriptar.aes256(req.body));
});

router.get("/encripta", async(req, res, next) => {
    var usuarios = new UsuariosDAO();
    var lista = await usuarios.listar().then().catch(error => {
        throw error;
    });
    lista.forEach(async(element) => {
        element.usuario = Encriptar.aes256(element.usuario);
        element.ip = Encriptar.aes256(element.ip);
        console.log(element);
        await usuarios.actualizar(element).then().catch(error => {
            throw error;
        });
    });
});

module.exports = router;

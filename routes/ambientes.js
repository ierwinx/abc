const logger = require('log4js').getLogger("Ambientes");
const express = require('express');
const router = express.Router();
const Utils = require('../helpers/Utils');
const CaracteristicaDAO = require('../daos/CaracteristicaDAO');
const FlujoDAO = require('../daos/FlujoDAO');
const ClienteDAO = require("../daos/ClienteDAO");
const EntidadDAO = require("../daos/EntidadDAO");
const Entrada = require("../helpers/Entrada");
const Desencriptar = require("../helpers/Desencripta");

router.post('/usuarios', function(req, res, next) {
    logger.info("Entra peticion ambientar usuarios");
    Entrada.procesa(req.body).then(data => {
        Utils.printJson(res, 200, process.env.e200, { titulo: 'infoClientes', objeto: data });
    }).catch(error => {
        if (error.length > 0) {
            Utils.printJson(res, 500, "Error al validar petición", { titulo: 'Errores', objeto: error });
        } else {
            Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
        }
    });
});

router.put('/usuarios', function(req, res, next) {
    logger.info("Entra peticion re ambientar usuarios");
    Entrada.reProcesa(Desencriptar.aes256(req.body)).then(data => {
        Utils.printJson(res, 200, process.env.e200, { titulo: 'infoClientes', objeto: data });
    }).catch(error => {
        if (error.length > 0) {
            Utils.printJson(res, 500, "Error al validar petición", { titulo: 'Errores', objeto: error });
        } else {
            Utils.printJson(res, 500, error.message, { titulo: 'Errores', objeto: [{message:error.message}] });
        }
    });
});

router.get('/flujos', function(req, res, next) {
    logger.info("Entra peticion consulta flujos");
    var flujosdao = new FlujoDAO();
    flujosdao.listar().then(data => {
        Utils.printJson(res, 200, process.env.e200, {titulo: "Flujos", objeto: data});
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.get('/caracteristicas', function(req, res, next) {
    logger.info("Entra peticion consulta caracteristicas");
    var caracteristicasdao = new CaracteristicaDAO();
    caracteristicasdao.listar().then(data => {
        Utils.printJson(res, 200, process.env.e200, {titulo: "Caracteristicas", objeto: data});
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.get('/entidades', function(req, res, next) {
    logger.info("Entra peticion consulta entidades");
    var entidaddao = new EntidadDAO();
    entidaddao.listar().then(data => {
        Utils.printJson(res, 200, process.env.e200, {titulo: "Entidades", objeto: data});
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.get('/consulta/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion consulta usuario por id " + req.params.id);
    var clientedao = new ClienteDAO();
    clientedao.buscar(req.params.id).then(data => {
        Utils.printJson(res, 200, process.env.e200, {titulo: "infoClientes", objeto: data});
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.delete('/borra/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion borado de usuario por id " + req.params.id);
    var clientedao = new ClienteDAO();
    clientedao.eliminar(req.params.id).then(data => {
        Utils.printJson(res, 200, process.env.e200, null);
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.use(function(req, res) {
    logger.info(" ::: URL no encontrada ::: ");
    Utils.printJson(res, 404, process.env.e404, { titulo: 'Errores', objeto: [] });
});
router.use(function(req, res) {
    logger.info(" ::: Error de servidor no conrolado ::: ");
    Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [] });
});

module.exports = router;
var logger = require('log4js').getLogger("Ambientes");
var express = require('express');
var router = express.Router();
var utils = require('../helpers/utils');
var caracteristicasDAO = require('../daos/caracteristicaDAO');
var flujosDAO = require('../daos/flujoDAO');
var clientesDAO = require("../daos/clienteDAO");
var Entrada = require("../helpers/Entrada");

router.post('/usuarios', function(req, res, next) {
    logger.info("Entra peticion ambientar usuarios");
    Entrada.procesa(req.body).then(data => {
        utils.printJson(res, 200, process.env.e200, { titulo: 'infoClientes', objeto: data });
    }).catch(error => {
        if (error.length > 0) {
            utils.printJson(res, 500, "Error al validar petición", { titulo: 'Errores', objeto: error });
        } else {
            utils.printJson(res, 500, error.message, null);
        }
    });
});

router.put('/usuarios', function(req, res, next) {
    logger.info("Entra peticion re ambientar usuarios");
    Entrada.reProcesa(req.body).then(data => {
        utils.printJson(res, 200, process.env.e200, { titulo: 'infoClientes', objeto: data });
    }).catch(error => {
        if (error.length > 0) {
            utils.printJson(res, 500, "Error al validar petición", { titulo: 'Errores', objeto: error });
        } else {
            utils.printJson(res, 500, error.message, null);
        }
    });
});

router.get('/flujos', function(req, res, next) {
    logger.info("Entra peticion consulta flujos");
    flujosDAO.listar().then(data => {
        utils.printJson(res, 200, process.env.e200, {titulo: "Flujos", objeto: data});
    }).catch(err => {
        utils.printJson(res, 500, error.message, null);
    });
});

router.get('/caracteristicas', function(req, res, next) {
    logger.info("Entra peticion consulta caracteristicas");
    caracteristicasDAO.listar().then(data => {
        utils.printJson(res, 200, process.env.e200, {titulo: "Caracteristicas", objeto: data});
    }).catch(err => {
        utils.printJson(res, 500, error.message, null);
    });
});

router.get('/consulta/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion consulta usuario por id");
    clientesDAO.buscar(req.params.id).then(data => {
        utils.printJson(res, 200, process.env.e200, {titulo: "infoClientes", objeto: data});
    }).catch(error => {
        utils.printJson(res, 500, error.message, null);
    });
});

router.delete('/borra/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion borado de usuario por id");
    clientesDAO.eliminar(req.params.id).then(data => {
        utils.printJson(res, 200, process.env.e200, null);
    }).catch(error => {
        utils.printJson(res, 500, error.message, null);
    });
});

router.use(function(req, res, next){
    logger.error("Url no encontrada");
    utils.printJson(res, 404, process.env.e404, null);
});
router.use(function(req, res, next){
    logger.error("Error servidor no controlado");
    utils.printJson(res, 500, process.env.e500, null);
});

module.exports = router;
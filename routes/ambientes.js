const logger = require('log4js').getLogger("Ambientes");
const express = require('express');
const router = express.Router();
const utils = require('../helpers/utils');
const caracteristicasDAO = require('../daos/caracteristicaDAO');
const flujosDAO = require('../daos/flujoDAO');
const clientesDAO = require("../daos/clienteDAO");
const entidadDAO = require("../daos/entidadDAO");
const Entrada = require("../helpers/Entrada");

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
        utils.printJson(res, 500, err.message, null);
    });
});

router.get('/caracteristicas', function(req, res, next) {
    logger.info("Entra peticion consulta caracteristicas");
    caracteristicasDAO.listar().then(data => {
        utils.printJson(res, 200, process.env.e200, {titulo: "Caracteristicas", objeto: data});
    }).catch(err => {
        utils.printJson(res, 500, err.message, null);
    });
});

router.get('/entidades', function(req, res, next) {
    logger.info("Entra peticion consulta entidades");
    entidadDAO.listar().then(data => {
        utils.printJson(res, 200, process.env.e200, {titulo: "Entidades", objeto: data});
    }).catch(err => {
        utils.printJson(res, 500, err.message, null);
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

router.use(function(req, res) {
    logger.info(" ::: URL no encontrada ::: ");
    utils.printJson(res, 404, process.env.e404, null);
});
router.use(function(req, res) {
    logger.info(" ::: Error de servidor no conrolado ::: ");
    utils.printJson(res, 500, process.env.e500, null);
});

module.exports = router;
const logger = require('log4js').getLogger("Auth");
const express = require('express');
const router = express.Router();
const Utils = require('../helpers/Utils');
const UsuarioDAO = require('../daos/UsuarioDAO');
const fs = require('fs');
const Mail = require('../config/Mail');
const cryptoJs = require('crypto-js');
const dsi = require("../services/OAUTH/dsi");
const Handlebars = require("Handlebars");
const peticion = require("../models/peticion");

router.post('/login', async(req, res, next) => {
    logger.info("::: Entra peticion Login :::");
    var header = req.headers['authorization'];
    if (!header) {
        logger.error("::: "+process.env.e400+" :::");
        return Utils.printJson(res, 400, process.env.e400, { titulo: 'Errores', objeto: [{message:process.env.e400}] });
    }
    var bearer = "";
    try {
        var bytes = cryptoJs.AES.decrypt(header, process.env.secret2);
        bearer = bytes.toString(cryptoJs.enc.Utf8);
    } catch(err) {
        logger.error("::: "+process.env.e403+" :::");
        return Utils.printJson(res, 403, process.env.e403, { titulo: 'Errores', objeto: process.env.e403 });
    }

    dsi.validaToken(bearer).then(decoded => {
        logger.info(" ::: Se obtiene el usuario a loguearse "+decoded.user_id+" :::");
        dsi.verificaInformacion(decoded.user_id).then(async(resp) => {
            
            var usuariodao = new UsuarioDAO();
            var usuario = await usuariodao.buscarNumeroUsuario(decoded.user_id).then();

            if (usuario == 0) {
                return Utils.printJson(res, 500, "Ocurrio un problema al buscar el usuario", { titulo: 'Errores', objeto: [{registro:false, autorizado:false}] });
            } else if (usuario == 1) {
                return Utils.printJson(res, 500, "Usuario no encontrado", { titulo: 'Errores', objeto: [{registro:false, autorizado:false}] });
            } else if (usuario == 2) {
                return Utils.printJson(res, 500, "El usuario encontrado no esta autorizado", { titulo: 'Errores', objeto: [{registro:true, autorizado:false}] });
            }

            var obj = {
                nEmpleado: resp.usuario.No_empleado,
                nombre: resp.usuario.Nombre
            }
            
            Utils.printJson(res, 200, process.env.e200, { titulo: "Usuario", objeto: obj });
            
        }).catch(err => {
            Utils.printJson(res, 500, err.message, { titulo: 'Errores', objeto: [{message:error.message}] });
        });
    }).catch(err => {
        Utils.printJson(res, 400, err.message, { titulo: 'Errores', objeto: [{message:error.message}] });
    });

});

router.post('/registro', function(req, res, next) {
    logger.info(" ::: Entra peticion registro ::: ");
    try {
        peticion.valida3(req.body)
    } catch(err) {
        return Utils.printJson(res, 500, process.env.e500, { titulo: "Errores", objeto: err});
    };
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    var user = {
        usuario: req.body.usuario,
        correo: req.body.correo,
        //rol: req.body.rol,
        ip: ip == '::1' ? '127.0.0.1' : ip
    };

    var usuariodao  = new UsuarioDAO();
    usuariodao.guardar(user).then(data => {
        fs.readFile("./views/Emails/email.hbs", 'utf8', function(err, html) {
            var template = Handlebars.compile(html);
            var datos = {
                usuario: user.usuario,
                correo: user.correo,
                ambiente: process.env.ambiente,
                dominio: process.env.backend + ':' + process.env.PORT,
                id: data.id
            }
            html = template(datos);
            let email = new Mail();
            email.enviar(email.informacion(html, process.env.MAIL)).then(resp2 => {
                Utils.printJson(res, 200, process.env.e200, null);
            }).catch(error => {
                Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
            });
        });
    }).catch(error => {
        Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
    });
});

router.get('/acepta/usuario/:id', function(req, res, next) {
    logger.info(" ::: Entra peticion acepta usuario :::");
    var id = req.params.id;
    var usuariodao  = new UsuarioDAO();
    usuariodao.activar({
        id: id,
        status: true
    }).then(resp => {
        fs.readFile("./views/Emails/aceptado.hbs", 'utf8', function(err, html) {
            var template = Handlebars.compile(html);
            var datos = {
                contenido: 'A partir de ahora ya tendras acceso al sistema',
                ambiente: process.env.ambiente,
                color : 'green'
            }
            html = template(datos);
            let email = new Mail();
            email.enviar(email.informacion(html, resp.correo));
        });
    });
    res.render('ingresa', { ambiente: process.env.ambiente });
});

router.get('/declina/usuario/:id', function(req, res, next) {
    logger.info(" ::: Entra peticion declina usuario :::");
    var id = req.params.id;
    var usuariodao  = new UsuarioDAO();
    usuariodao.activar({
        id: id,
        status: false
    }).then(resp => {
        fs.readFile("./views/Emails/aceptado.hbs", 'utf8', function(err, html) {
            var template = Handlebars.compile(html);
            var datos = {
                contenido: 'Se denego el acceso al sistema',
                ambiente: process.env.ambiente,
                color : 'red'
            } 
            html = template(datos);
            let email = new Mail();
            email.enviar(email.informacion(html, resp.correo));
        });
    });
    res.render('ingresa', { ambiente: process.env.ambiente });
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
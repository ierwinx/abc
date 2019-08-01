const logger = require('log4js').getLogger("Auth");
const express = require('express');
const router = express.Router();
const Utils = require('../helpers/Utils');
const UsuarioDAO = require('../daos/UsuarioDAO');
const fs = require('fs');
const Mail = require('../config/Mail');
const Desencriptar = require('../helpers/Desencripta');
const Encriptar = require('../helpers/Encriptar');
const DSI = require("../services/OAUTH/DSI");
const nunjucks = require('express-nunjucks');
const peticion = require("../models/Peticion");
const BloqueoDAO = require("../daos/BloqueoDAO");
const Fechas = require("../helpers/Fechas");

router.post('/login', async(req, res, next) => {
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    logger.info("::: Entra peticion Login de ip: " + ip + " :::");
    var header = req.headers['authorization'];
    if (!header) {
        logger.error("::: "+process.env.e400+" :::");
        return Utils.printJson(res, 400, process.env.e400, { titulo: 'Errores', objeto: [{message:process.env.e400}] });
    }
    var bearer = "";
    try {
        bearer = Desencriptar.aes256(header);
    } catch(err) {
        logger.error("::: "+process.env.e403+" :::");
        return Utils.printJson(res, 403, process.env.e403, { titulo: 'Errores', objeto: process.env.e403 });
    }

    var dsi = new DSI();
    dsi.validaToken(bearer).then(decoded => {
        logger.info(" ::: Se obtiene el usuario a loguearse "+decoded.user_id+" :::");
        dsi.verificaInformacion(decoded.user_id).then(async(resp) => {
            
            var usuariodao = new UsuarioDAO();
            var usuario = await usuariodao.buscarCorreo(resp.usuario.Correo).then();

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
            
        }).catch(error => {
            Utils.printJson(res, 500, error.message, { titulo: 'Errores', objeto: [{message:error.message}] });
        });
    }).catch(async(error) => {
        if (error.message == "Token invalido") {
            var bloqueodao = new BloqueoDAO();
            var usuarioBloqueado = await bloqueodao.buscar(ip == "::1" ? "127.0.0.1" : ip);
            if (usuarioBloqueado) {
                if (usuarioBloqueado.contador == 3) {
                    return Utils.printJson(res, 505, process.env.e505, { titulo: 'Errores', objeto: [{message:process.env.e505}, {message: "Favor de validar en 10 minutos"}] });
                } else {
                    usuarioBloqueado.contador = usuarioBloqueado.contador + 1;
                    var actualizado = await bloqueodao.actualiza(usuarioBloqueado).then().catch(error => {
                        logger.error(" ::: Error al actualizar usuario bloqueado :::");
                        return Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:process.env.e500}] });
                    });
                    if (actualizado.ok == 1){
                        return Utils.printJson(res, 505, process.env.e505, { titulo: 'Errores', objeto: [{message:error.message}] });
                    }
                }
            } else {
                var bloqueo = {
                    ip: ip == "::1" ? "127.0.0.1" : ip,
                    hora: Fechas.horaActual()
                }
                bloqueodao.guardar(bloqueo).then().catch(error => {
                    logger.error(" ::: Error al guardar usuario bloqueado :::");
                    return Utils.printJson(res, 500, process.env.e500, { titulo: 'Errores', objeto: [{message:error.message}] });
                });
                return Utils.printJson(res, 505, process.env.e505, { titulo: 'Errores', objeto: [{message:error.message}] });
            }
        } else {
            Utils.printJson(res, 400, error.message, { titulo: 'Errores', objeto: [{message:error.message}] });
        }
    });

});

router.post('/registro', function(req, res, next) {
    logger.info(" ::: Entra peticion registro ::: ");
    var pet = new Object();
    if (req.body.length > 0) {
        pet = JSON.parse(Desencriptar.aes256(req.body));
    } else {
        try {
            peticion.valida3({});
        } catch(err) {
            return Utils.printJson(res, 500, process.env.e500, { titulo: "Errores", objeto: err});
        }
    }
    try {
        peticion.valida3(JSON.parse(Desencriptar.aes256(req.body)));
    } catch(err) {
        return Utils.printJson(res, 500, process.env.e500, { titulo: "Errores", objeto: err});
    }
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    var user = {
        usuario: Encriptar.aes256(pet.usuario),
        correo: pet.correo,
        ip: Encriptar.aes256(ip == '::1' ? '127.0.0.1' : ip)
    };

    var usuariodao  = new UsuarioDAO();
    usuariodao.guardar(user).then(data => {
        fs.readFile("./views/Emails/email.hbs", 'utf8', function(err, html) {
            var template = Handlebars.compile(html);
            var datos = {
                usuario: Desencriptar.aes256(user.usuario),
                correo: user.correo,
                ambiente: process.env.ambiente,
                dominio: process.env.backend + ':' + process.env.PORT,
                id: Encriptar.aes256(data.id)
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
    var id = Desencriptar.aes256(req.params.id);
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
    var id = Desencriptar.aes256(req.params.id);
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
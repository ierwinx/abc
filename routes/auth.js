var logger = require('log4js').getLogger("Auth");
var express = require('express');
var router = express.Router();
var utils = require('../helpers/utils');
var UsuarioDAO = require('../daos/usuarioDAO');
var fs = require('fs');
var mail = require('../config/mail');
var jwt = require('jsonwebtoken');
var dsi = require("../services/OAUTH/dsi");

router.post('/login', async(req, res, next) => {
    /*logger.info("Entra peticion Login");
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    var usuario = await UsuarioDAO.buscarNumeroUsuario(req.body.usuario).then().catch(error => {
        return utils.printJson(res, 500, error.message, null);
    });
    if (ip != "::1") {
        if (usuario.ip != ip) {
            logger.error(" ::: Se esta accediendo a una ip no valida ;;; ");
            return utils.printJson(res, 505, process.env.e505, null);
        }
    }
    var token = jwt.sign({
        _username: req.body.usuario
    }, process.env.secret, {
        expiresIn: parseInt(process.env.tiempojwt)
    });

    utils.printJson(res, 200, process.env.e200, { titulo: "Token", objeto: token });*/
    
    /*logger.info("Entra peticion Login oath con dsi");
    var header = req.headers['authorization'];
    if (!header) {
        logger.error("::: "+process.env.e400+" :::");
        return utils.printJson(res, 400, process.env.e400, null);
    }
    var bearer = "";
    try {
        var bytes = cryptoJs.AES.decrypt(header, process.env.secret2);
        bearer = bytes.toString(cryptoJs.enc.Utf8);
    } catch(err) {
        logger.error("::: "+process.env.e403+" :::");
        return utils.printJson(res, 403, process.env.e403, null);
    }

    var decoded = await dsi.validaToken(bearer).then().catch(err => {
        return utils.printJson(res, 500, process.env.e500, null);
    });
    console.log("decoded");
    console.log(decoded.user_id);*/

    var header = req.headers['authorization'];
    if (!header) {
        logger.error("::: "+process.env.e400+" :::");
        return utils.printJson(res, 400, process.env.e400, null);
    }
    var bearer = "";
    try {
        var bytes = cryptoJs.AES.decrypt(header, process.env.secret2);
        bearer = bytes.toString(cryptoJs.enc.Utf8);
    } catch(err) {
        logger.error("::: "+process.env.e403+" :::");
        return utils.printJson(res, 403, process.env.e403, null);
    }

    var decoded = await dsi.validaToken(bearer).then().catch(err => {
        return utils.printJson(res, 500, process.env.e500, null);
    });

    var resp = await dsi.verificaInformacion(decoded.user_id).then().catch(err => {
        return utils.printJson(res, 500, process.env.e500, null);
    });

    utils.printJson(res, 200, process.env.e200, { titulo: "Token", objeto: resp });

});

router.post('/registro', function(req, res, next) {
    logger.info("Entra peticion registro");
    var ip = req.ip.replace(/^([a-z:]+):(\d+).(\d+).(\d+).(\d+)$/g, '$2.$3.$4.$5');
    var user = {
        usuario: req.body.usuario,
        correo: req.body.correo,
        ip: ip == '::1' ? '127.0.0.1' : ip
    };
    UsuarioDAO.guardar(user).then(data => {
        fs.readFile("./views/Emails/email.html", 'utf8', function(err, html) {
            html = utils.procesaPlantilla(html, [
                { usuario: user.usuario },
                { correo: user.correo },
                { ambiente: process.env.ambiente },
                { dominio: process.env.backend + ':' + process.env.PORT },
                { id: data.id },
                { dominio: process.env.backend + ':' + process.env.PORT },
                { id: data.id }
            ]);
            mail.enviar(mail.informacion(html, process.env.MAIL)).then(resp2 => {
                utils.printJson(res, 200, process.env.e200, null);
            }).catch(error => {
                utils.printJson(res, 500, error.message, null);
            });
        });
    }).catch(error => {
        utils.printJson(res, 500, error.message, null);
    });
});

router.get('/acepta/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion acepta usuario");
    var id = req.params.id;
    UsuarioDAO.activar({
        id: id,
        status: true
    }).then(resp => {
        fs.readFile("./views/Emails/aceptado.html", 'utf8', function(err, html) {
            html = utils.procesaPlantilla(html, [
                { contenido: 'A partir de ahora ya tendras acceso al sistema' },
                { ambiente: process.env.ambiente },
                { color : 'green'},
                { color : 'green'}
            ]);
            mail.enviar(mail.informacion(html, resp.correo));
        });
    });
    res.render('ingresa', { ambiente: process.env.ambiente });
});

router.get('/declina/usuario/:id', function(req, res, next) {
    logger.info("Entra peticion declina usuario");
    var id = req.params.id;
    UsuarioDAO.activar({
        id: id,
        status: false
    }).then(resp => {
        fs.readFile("./views/Emails/aceptado.html", 'utf8', function(err, html) {
            html = utils.procesaPlantilla(html, [
                { contenido: 'Se denego el acceso al sistema' },
                { ambiente: process.env.ambiente },
                { color : 'red'},
                { color : 'red'}
            ]);
            mail.enviar(mail.informacion(html, resp.correo));
        });
    });
    res.render('ingresa', { ambiente: process.env.ambiente });
});

router.use(function(req, res) {
    logger.info("URL no encontrada");
    utils.printJson(res, 404, process.env.e404, null);
});
router.use(function(req, res) {
    logger.info("Error de servidor no conrolado");
    utils.printJson(res, 500, process.env.e500, null);
});

module.exports = router;
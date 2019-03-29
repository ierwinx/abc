const nodemailer = require('nodemailer');
const logger = require('log4js').getLogger("Mail");

class Mail {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtpaz.aztecaservicios.com',
            port: 25,
            secure: false,
            tls: { 
                rejectUnauthorized: false 
            }
        });
    }

    async enviar(datos) {
        var respuesta = await this.transporter.sendMail(datos).catch(err => {
            logger.error(" ::: Ocurrio un Error al enviar Email :::");
            throw new Error("Error al enviar el correo");
        });
        return respuesta;
    }

    informacion(html, para) {
        var contenido = {
            from: '"Ambientación Base Clientes" <eluz@bancoazteca.com>',
            to: para,
            subject: 'Verifica alta usuario',
            html: html
        };
        return contenido;
    }

}

module.exports = Mail;
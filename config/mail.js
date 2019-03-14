var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtpaz.aztecaservicios.com',
    port: 25,
    secure: false,
    tls: { 
        rejectUnauthorized: false 
    }
});

const enviar = async(datos) => {
    var respuesta = await transporter.sendMail(datos).catch(err => {
        throw new Error("Error al enviar el correo");
    });
    return respuesta;
}

var informacion = function(html, para) {
    var contenido = {
        from: '"Ambientación Base Clientes" <eluz@bancoazteca.com>',
        to: para,
        subject: 'Verifica alta usuario',
        html: html
    };
    return contenido;
};


module.exports = {
    enviar,
    informacion
};
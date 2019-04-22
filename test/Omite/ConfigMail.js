const Mail = require("../config/Mail");

describe('Test correo', function() {

    it('Enviar', function(done) {
        var mail = new Mail();
        mail.enviar(mail.informacion("<h1>Pruebas unitarias HTML</h1>", "eluz@bancoazteca.com")).then(resp => {
            done();
        }).catch(error => {
            done(error);
        });
    });

});
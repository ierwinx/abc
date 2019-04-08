const assert = require('chai').assert;
const UsuariosDAO = require("../daos/UsuarioDAO");

describe('EncriptaUsuarios', function() {
    it ("se consulta todos los usuarios de la base", async function(done) {
        var usuarios = new UsuariosDAO();
        var res = await usuarios.listar().then().catch(error => {
            assert.ok(false);
            console.log("Entro aqui")
            done(error);
        });
        console.log("Entro aqui2")
        assert.isNotEmpty(res);
        done();
        console.log(res);
    });
});
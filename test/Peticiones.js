const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Encriptar = require("../helpers/Encriptar");

chai.use(chaiHttp);

describe('Ambientes', function() {
    it('valida status endpoint /entidades', function(done) {
        chai.request(server).get('/ambientes/v1/entidades').end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Lista /caracteristicas', function(done) {
        chai.request(server).get('/ambientes/v1/caracteristicas').end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Lista /flujos', function(done) {
        chai.request(server).get('/ambientes/v1/flujos').end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Ambienta /usuarios vacio', function(done) {
        chai.request(server).post('/ambientes/v1/usuarios').end(function(err, res) {
            res.should.have.status(500);
            done();
        });
    });

    it('Ambienta /usuarios con body', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 7.0,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                        nombre: "Erwin",
                        apellidoP: "De La Luz",
                        apellidoM: "De Leon",
                        fechaNac: "19/06/2019",
                        curp:"LULE910429HMCZNR07",
                        rfc:"JULE910429D74",
                        genero:"M",
                        idEntidadFederativa:17
                }
            ]
        }))

        console.log(body)

        chai.request(server).post('/ambientes/v1/usuarios').send(body).end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });
});
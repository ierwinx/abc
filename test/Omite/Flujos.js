const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Encriptar = require("../helpers/Encriptar");

chai.use(chaiHttp);

describe('Ambientacion clientes', function() {

    it('Flujo 1.0', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 1.0,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    calle: "RIO",
                    numExt: "9",
                    cp: "56641",
                    colonia: "Los reyes",
                    delegacion: "Gustavo A Madero",
                    estado : "CDMX",
                    idEntidadFederativa:17
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 1.4', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 1.4,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    calle: "RIO",
                    numExt: "9",
                    cp: "56641",
                    colonia: "Los reyes",
                    delegacion: "Gustavo A Madero",
                    estado : "CDMX",
                    idEntidadFederativa:17
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 1.6', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 1.6,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    calle: "RIO",
                    numExt: "9",
                    cp: "56641",
                    colonia: "Los reyes",
                    delegacion: "Gustavo A Madero",
                    estado : "CDMX",
                    idEntidadFederativa:17
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 2.0', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 2.0,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    idEntidadFederativa:17,
                    ocr: "0824050365609",
                    numeroEmision: "01",
                    claveElector: "LZNER91042915H800",
                    vigencia:"2019"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 2.1', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 2.1,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    idEntidadFederativa:17,
                    ocr: "0824050365609",
                    numeroEmision: "01",
                    claveElector: "LZNER91042915H800",
                    vigencia:"2019"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 2.2', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 2.2,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    idEntidadFederativa:17,
                    ocr: "0824050365609",
                    numeroEmision: "01",
                    claveElector: "LZNER91042915H800",
                    vigencia:"2019"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 2.3', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 2.3,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    idEntidadFederativa:17,
                    ocr: "0824050365609",
                    numeroEmision: "01",
                    claveElector: "LZNER91042915H800",
                    vigencia:"2019"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 2.4', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 2.4,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    idEntidadFederativa:17,
                    ocr: "0824050365609",
                    numeroEmision: "01",
                    claveElector: "LZNER91042915H800",
                    vigencia:"2019"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 5.0', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 5.0,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"JULE910429D74",
                    genero:"M",
                    correo: "correo@pruebas.com",
                    numCel:"5293668765",
                    calle: "RIO",
                    numExt: "9",
                    cp: "56641",
                    colonia: "Los reyes",
                    delegacion: "Gustavo A Madero",
                    estado : "CDMX",
                    idEntidadFederativa:17
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 7.0', function(done) {

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
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    idEntidadFederativa:17
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('Flujo 7.1', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 7.1,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    icu: "9ba7c50b141949c7b3dbd0b98ca3fb27"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(500);
            done();
        });
    });

    it('Flujo 7.2', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 7.2,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    icu: "9ba7c50b141949c7b3dbd0b98ca3fb27",
                    contra: "minuevacontrasena"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(500);
            done();
        });
    });

    it('Flujo 7.4', function(done) {

        var body = Encriptar.aes256(JSON.stringify({
            flujo: 7.4,
            numUsuarios: 1,
            caracteristicas : [],
            usuarioLogin: "364088",
            infoCliente: [
                {
                    nombre: "Erwin",
                    apellidoP: "De La Luz",
                    apellidoM: "De Leon",
                    fechaNac: "29/04/1991",
                    curp:"LULE910429HMCZNR07",
                    rfc:"LULE910429D74",
                    genero:"M",
                    cic: "349873543",
                    vigencia: "2023"
                }
            ]
        }));

        chai.request(server).post('/ambientes/v1/usuarios').send(body).set("Content-Type","text/plain").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

});
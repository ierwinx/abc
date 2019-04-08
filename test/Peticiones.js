const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

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

    it('Ambienta /usuarios', function(done) {
        chai.request(server).post('/ambientes/v1/usuarios').end(function(err, res) {
            res.should.have.status(500);
            done();
        });
    });
});
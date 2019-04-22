const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const DatosPersonales = require("../helpers/DatosPersonales");

describe('Datos Personales', function() {

    it('CambiaMayusculas', function() {
        var datos = [
            {
                nombre: "Erwin",
                apellidoP: "De La Luz",
                apellidoM: "De Leon",
                calle: "RIO",
                colonia: "Los reyes",
                delegacion: "Gustavo A Madero",
                estado: "Mexico"
            }
        ];

        var datosPer = new DatosPersonales();
        var resp = datosPer.cambiaMayusculas(datos);
        resp.should.have.length(1);
    });

    it('CambiaGenero', function() {
        var res = DatosPersonales.cambiaGenero("F");
        assert.equal(res, "M");
    });

    it('QuitaCaracteres', function() {
        var datosPer = new DatosPersonales();
        var resp = datosPer.quitaCaracteres("neéusdgaóúmcñádkí");
        assert.equal(resp, "NEEUSDGAOUMCXADKI");
    });

    it('ConcatenaDatos', function() {
        var datosPer = new DatosPersonales();
        var resp = datosPer.concatenaDatos("Frase1", "Frase2");
        assert.equal(resp, "Frase1|Frase2");
    });

    it('GeneraMenorEdad', function(done) {
        var datos = {
            nombre: "Erwin",
            apellidoP: "De La Luz",
            apellidoM: "De Leon",
            fechaNac: "29/04/1991",
            genero: "M",
            idEntidadFederativa: 17
        };

        var datosPer = new DatosPersonales();
        datosPer.generaMenorEdad(datos).then(resp => {
            var anio = resp.fechaNac.split("/")[2];
            var fechaActual = new Date();
            var anioActual = fechaActual.getFullYear();
            done();
        }).catch(error => {
            done(error);
        });

        
    });

});
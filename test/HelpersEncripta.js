const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const Encriptar = require("../helpers/Encriptar");

describe('Encriptar', function() {

    it('aes256', function() {
        var resp = Encriptar.aes256("Hola");
        console.log(resp)
        assert.isNotEmpty(resp);
    });

});
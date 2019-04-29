const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const Desencripta = require("../helpers/Desencripta");

describe('Desencriptar', function() {

    it('aes256', function() {
        var resp = Desencripta.aes256("53616c7465645f5f360647d5636b9955603b3c5c152af6128d679d26ff1488d3");
        assert.equal(resp, "Hola");
    });

});
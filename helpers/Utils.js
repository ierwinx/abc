const logger = require('log4js').getLogger("Utils");
const uuidv1 = require('uuid/v1');
const Encriptar = require("./Encriptar");

class Utils {

    constructor() {
    }

    static printJson(res, status, mensaje, object) {
        var aleatorio = Math.floor(Math.random() * 99);

        var json = {
            codigo: status + ".banca_digital-ambientacion_clientes." + aleatorio,
            mensaje: mensaje,
            info: "http://developer.company.com/errors#" + status + ".01." + aleatorio,
            folio: uuidv1()
        }
        if (object !== null) {
            json[object.titulo] = object.objeto
        }
        logger.info(" ::: JSON respuesta " + JSON.stringify(json) + " con Status " + status + " ::: ");
        res.status(status).json(Encriptar.aes256(JSON.stringify(json)));
    }

    static parseBool(cadena) {
        var resp = true;
        if (cadena == 'false') {
            resp = false;
        }
        return resp;
    }

}

module.exports = Utils;
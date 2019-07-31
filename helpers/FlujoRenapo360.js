const logger = require('log4js').getLogger("FlujoRenapo360");
const Renapo = require("../services/360/Renapo");

class FlujoRenapo360 {

    constructor() {
    }

    static async iniciar(body) {
        logger.info(" ::: se incia Flujo renapo 360:::");

        var renapo = new Renapo();

        var resp = await renapo.consulta(body).then().catch(error => {
            throw error;
        });

        if (resp) {
            var borrar = await renapo.borrar(body).then().catch(error => {
                throw error;
            });
        }

        var alta = await renapo.alta(body).then().catch(error => {
            throw error;
        });

        var resp = await renapo.consulta(body).then().catch(error => {
            throw error;
        });

        if (!resp) {
            logger.error(" ::: Ocurrio un Error con el servicio alta renapo 360 ::: ");
            reject(new Error("Ocurrio un Error con el consumo del servicio de alta Renapo 360 "));
        }

        return body;

    }

}

module.exports = FlujoRenapo360;
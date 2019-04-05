const logger = require('log4js').getLogger("FlujoLN360");
const ListasNegras = require("../services/360/ListasNegras");

class FlujoLN360 {

    constructor() {
    }

    static async ejecuta(datos) {
        logger.info(" ::: Inicia Flujo de listas Negras ::: ");

        var listasNegras = new ListasNegras();
        var resp1 = await listasNegras.consulta(datos).then().catch(error => {
            throw error;
        });

        //se borrara informacion LN
        if (resp1.statusLN) {

        }

        datos = await listasNegras.alta(datos).then().catch(error => {
            throw error;
        });

        return datos;
    }

}

module.exports = FlujoLN360;
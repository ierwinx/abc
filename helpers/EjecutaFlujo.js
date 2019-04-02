const logger = require('log4js').getLogger("EjecutaFlujo");
const Objetos = require("../services/CU/Objetos");
const CRUD = require("../services/CU/CRUD");
const Ligue = require("../services/CU/Ligue");
const Renapo = require("../services/CU/Renapo");
const Activacion = require("../services/360/Activacion");
const Consultas = require("../services/360/Consultas");
const Borrado = require("../services/360/Borrado");
const Desbloqueo = require("../services/360/Desbloqueo");
const Actualiza = require("../services/360/Actualiza");
const FlujoINE = require("./FlujoINE");
const Cuentas = require("../services/Alnova/Cuentas");
const DatosPersonales = require("../helpers/DatosPersonales");

class EjecutaFlujo {

    constructor() {
    }

    async procesa(objeto, servicio) {
        logger.info(` ::: Ejectuta el servicio ${servicio} ::: `);

        switch (servicio) {
            case 0.1: {
                logger.info(" ::: Hacer menor ::: ");
                var persona = new DatosPersonales();
                objeto = persona.generaMenorEdad(objeto);
                break;
            }   
            case 1.1: {
                logger.info(" ::: Borrar CU ::: ");
                let crudl = new CRUD();
                objeto = await crudl.borrar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.2: {
                logger.info(" ::: Alta CU :::");
                let crudl = new CRUD();
                objeto = await crudl.alta(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.3: {
                logger.info(" ::: Consulta CU ::: ");
                let crudl = new CRUD();
                objeto = await crudl.buscar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.4: {
                logger.info(" ::: Actualiza foto CU ::: ");
                let objetoscu = new Objetos();
                objeto = await objetoscu.actualizaFoto(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.5: {
                logger.info(" ::: Actualiza Huellas CU ::: ");
                let objetoscu = new Objetos();
                objeto = await objetoscu.actualizaHuellas(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.6: {
                logger.info(" ::: Ligue CU ::: ");
                var ligue = new Ligue();
                objeto = await ligue.cuenta(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 1.7: {
                logger.info(" ::: Alta renapo ::: ");
                var renapo = new Renapo();
                objeto = await renapo.alta(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.1: {
                logger.info(" ::: Alta INE ::: ");
                objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.2: {
                logger.info(" ::: Consulta INE ::: "); //no se utilizara
                objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.3: {
                logger.info(" ::: Borrado INE ::: ");//no se utilizara
                objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.4: {
                logger.info(" ::: Modificacion INE ::: ");//no se utilizara
                objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.5: {
                logger.info(" ::: Activacion por sucursal ::: ");
                var activa360 = new Activacion();
                objeto = await activa360.sucursal(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.6: {
                logger.info(" ::: Extendidos ::: ");
                let actualizacion = new Actualiza();
                objeto = await actualizacion.extendidos(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 2.7: {
                logger.info(" ::: Borrado 360 ::: ");
                let crudl = new CRUD();
                var resp1 = await crudl.buscarXnombre(objeto).then().catch(err => {
                    throw err;
                });
                if (resp1.statusCU) {
                    var borrar360 = new Borrado()
                    objeto = await borrar360.elimina(objeto).then().catch(err => {
                        throw err;
                    });
                }
                break;
            }
            case 2.8: {
                logger.info(" ::: Listas Negras 360 ::: ");
                break;
            }
            case 2.9: {
                logger.info(" ::: Desbloqueo ::: ");
                var desblo = new Desbloqueo();
                objeto = await desblo.desbloquea(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 3.0: {
                logger.info(" ::: Actualiza contra 360 ::: ");
                let actualizacion = new Actualiza();
                objeto = await actualizacion.contrasena(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 3.1: {
                logger.info(" ::: Consulta 360 ::: ");
                var consultas360 = new Consultas()
                objeto = await consultas360.buscar(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 3.2: {
                logger.info(" ::: Apertura cuenta digital MB80 ::: ");
                let cuentas = new Cuentas();
                objeto = await cuentas.MB80(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 3.3: {
                logger.info(" ::: Apertura cuenta MB34 ::: ");
                let cuentas = new Cuentas();
                objeto = await cuentas.MB34(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }   
            case 3.4: {
                logger.info(" ::: Apertura cuenta guardadito BB02 ::: ");
                let cuentas = new Cuentas();
                objeto = await cuentas.BB02(objeto).then().catch(err => {
                    throw err;
                });
                break;
            }
            case 4.1: {
                logger.info(" ::: Crea credito ::: ");
                break;
            }
        }

        return objeto;
    }

}

module.exports = EjecutaFlujo;
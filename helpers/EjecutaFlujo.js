const logger = require('log4js').getLogger("EjecutaFlujo");
const borradoCteCUDAO = require("../services/CU/borradoCteCUDAO");
const FotoDAO = require("../services/CU/FotoDAO");
const HuellasCUDAO = require("../services/CU/HuellasCUDAO");
const altaCUDAO = require("../services/CU/altaCUDAO");
const busquedaCUDAO = require("../services/CU/busquedaCUDAO");
const ligueCUCADAO = require("../services/CU/ligueCUCADAO");
const renapoCUDAO = require("../services/CU/renapoCUDAO");

const ActivacionXSuc = require("../services/360/ActivacionXSuc");
const Consultado360 = require("../services/360/Consultado");
const Extendidos360 = require("../services/360/Extendidos");
const Borrar360 = require("../services/360/Borrar");
const Ine360 = require("../services/360/Ine");
const Desbloqueo = require("../services/360/Desbloqueo");

const FlujoINE = require("./FlujoINE");

const Cuentas = require("../services/Alnova/Cuentas");

const datosPersonales = require("../helpers/datosPersonales");

var procesa = async(objeto, servicio) => {
    logger.info(` ::: Ejectuta el servicio ${servicio} ::: `);

    switch (servicio) {
        case 0.1:
            logger.info(" ::: Hacer menor ::: ");
            objeto = datosPersonales.generaMenorEdad(objeto);
            break;
        case 1.1:
            logger.info(" ::: Borrar CU ::: ");
            objeto = await borradoCteCUDAO.borrarCteCU(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.2:
            logger.info(" ::: Alta CU :::");
            objeto = await altaCUDAO.altaClienteCU(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.3:
            logger.info(" ::: Consulta CU ::: ");
            objeto = await busquedaCUDAO.consultaXnombreCU(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.4:
            logger.info(" ::: Actualiza foto CU ::: ");
            objeto = await FotoDAO.actualizaFoto(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.5:
            logger.info(" ::: Actualiza Huellas CU ::: ");
            objeto = await HuellasCUDAO.actualizaHuellas(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.6:
            logger.info(" ::: Ligue CU ::: ");
            objeto = await ligueCUCADAO.ligarCuentaCU(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 1.7:
            logger.info(" ::: Alta renapo ::: ");
            objeto = await renapoCUDAO.altaRenapoCU(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.1:
            logger.info(" ::: Alta INE ::: ");
            objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.2:
            logger.info(" ::: Consulta INE ::: "); //no se utilizara
            objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.3:
            logger.info(" ::: Borrado INE ::: ");//no se utilizara
            objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.4:
            logger.info(" ::: Modificacion INE ::: ");//no se utilizara
            objeto = await FlujoINE.iniciar(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.5:
            logger.info(" ::: Activacion por sucursal ::: ");
            objeto = await ActivacionXSuc.activacionXsuc(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.6:
            logger.info(" ::: Extendidos ::: ");
            objeto = await Extendidos360.actualizaExt(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 2.7:
            logger.info(" ::: Borrado 360 ::: ");
            var resp1 = await busquedaCUDAO.consultaXnombreSoloBusca(objeto).then().catch(err => {
                throw err;
            });
            if (resp1) {
                objeto = await Borrar360.borrar(objeto).then().catch(err => {
                    throw err;
                });
            }
            break;
        case 2.8:
            logger.info(" ::: Listas Negras 360 ::: ");
            break;
        case 2.9:
            logger.info(" ::: Desbloqueo ::: ");
            objeto = Desbloqueo.desbloquea(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 3.1:
            logger.info(" ::: Consulta 360 ::: ");
            objeto = Consultado360.consultado360(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 3.2:
            logger.info(" ::: Apertura cuenta digital MB80 ::: ");
            objeto = await Cuentas.MB80(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 3.3:
            logger.info(" ::: Apertura cuenta MB34 ::: ");
            objeto = await Cuentas.MB34(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 3.4:
            logger.info(" ::: Apertura cuenta guardadito BB02 ::: ");
            objeto = await Cuentas.BB02(objeto).then().catch(err => {
                throw err;
            });
            break;
        case 4.1:
            logger.info(" ::: Crea credito ::: ");
            break;
    }

    return objeto;
}

module.exports = {
    procesa
}
const logger = require('log4js').getLogger("Entrada");
const peticion = require('../models/peticion');
const flujosDAO = require("../daos/flujoDAO");
const caracteristicaDAO = require("../daos/caracteristicaDAO");
const InfoCliente = require("../models/InfoCliente");
const personaDAO = require("../daos/personaDAO");
const clienteDAO = require("../daos/clienteDAO");
const EjecutaFlujo = require("../helpers/EjecutaFlujo");
const DatosPersonales = require("../helpers/DatosPersonales");

class Entrada {

    constructor() {
    }

    static async procesa(datos) {
        logger.info(" ::: Inicia proceso de ambientacion usuarios :::");
        peticion.valida(datos);
        console.log(datos);
    
        var eventosEjecutar = new Array();
        var flujo = await flujosDAO.buscar(datos.flujo).then().catch(error => {
            throw error;
        });
        eventosEjecutar = flujo.servicios;
    
        if (datos.caracteristicas.length > 0) {
            var caracteristicas = await caracteristicaDAO.compatibles(datos.flujo).then().catch(error => {
                throw error;
            });
            var noCompatibles = "";
            datos.caracteristicas.forEach(element => {
                var encontro = false;
                caracteristicas.forEach(element2 => {
                    if (element == element2.id) {
                        encontro = true;
                    }
                });
                if (!encontro) {
                    noCompatibles += element + ", ";
                }
                if (element != datos.flujo) {
                    if (0.1 === element) {
                        eventosEjecutar.unshift(element);
                    } else {
                        eventosEjecutar.push(element);
                    }
                }
            });
            if (noCompatibles.length > 0) {
                throw new Error("Las caracteristicas [" + noCompatibles.substr(0, noCompatibles.length-2) + "] no son compatibles");
            }
        }
    
        var validaciones = new InfoCliente();
        switch(datos.flujo) {
            case 7.1:
                validaciones.iteraInfo(datos.infoCliente, datos.flujo);
                break;
            case 7.2:
                validaciones.iteraInfo(datos.infoCliente, datos.flujo);
                break;
            default:
                if (datos.infoCliente.length > 0) {
                    if (validaciones.crearUsuario(datos.infoCliente[0])) {
                        validaciones.iteraInfo(datos.infoCliente, datos.flujo);
                    } else {
                        if (datos.flujo < 7) {
                            datos.infoCliente = await personaDAO.creaPersona(datos.numUsuarios, datos.infoCliente).catch(err => {
                                throw err;
                            });
                        }
                        validaciones.iteraInfo(datos.infoCliente, datos.flujo);
                    }
                } else {
                    datos.infoCliente = await personaDAO.creaPersona(datos.numUsuarios, null).catch(err => {
                        throw err;
                    });
                }
                var persona = new DatosPersonales()
                datos.infoCliente = persona.cambiaMayusculas(datos.infoCliente);
                break;
        }
    
        var respuesta = new Array();
        var ejecutaF = new EjecutaFlujo();
        for (let i = 0; i < datos.infoCliente.length; i++) {
            var cliente = new Object();
            for (let j = 0; j < eventosEjecutar.length; j++) {
                cliente = await ejecutaF.procesa(datos.infoCliente[i], eventosEjecutar[j]).then().catch(err => {
                    throw err;
                });
            }
            cliente.descFlujo = flujo.nombreFlujo;
            cliente.estatusCliente = true;
            cliente.flujo = datos.flujo;
            cliente.usuarioLogin = datos.usuarioLogin;
            respuesta.push(cliente);
        }
    
        var arregloSalida = new Array();
        if (datos.flujo <= 7) {
            for (let i = 0; i < respuesta.length; i++) {
                var objSal = await clienteDAO.guardar(respuesta[i]);
                arregloSalida.push(objSal.toJSON());
            }
        } else {
            arregloSalida = respuesta;
        }
    
        return arregloSalida;
    }

    static async reProcesa(datos) {
        logger.info(" ::: Inicia proceso de re ambientacion usuarios :::");

        peticion.valida2(datos);
    
        var id = datos.id;
        var respuesta = new Object();
    
        var activa = await clienteDAO.activar(id).then().catch(err => {
            throw err;
        });
    
        if (activa.ok == 1) {
            var encuentra = await clienteDAO.get(id).then().catch(error => {
                throw error;
            });
    
            if (encuentra == null) {
                throw new Error("Cliente a re ambientar no encontrado");
            }
    
            var jsonEnviar = {
                "flujo": encuentra.flujo,
                "numUsuarios": 1,
                "caracteristicas": [],
                "infoCliente": [encuentra]
            }
    
            respuesta = await procesa(jsonEnviar).then().catch(err => {
                throw err;
            });
    
            borrado = await clienteDAO.eliminaCliente(id).then().catch(err => {
                throw err;
            });
            
        } else {
            throw new Error('Error al activar cliente');
        }
    
        return respuesta;
    }

}

module.exports = Entrada;
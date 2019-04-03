const logger = require('log4js').getLogger("Entrada");
const Peticion = require('../models/Peticion');
const FlujoDAO = require("../daos/FlujoDAO");
const CaracteristicaDAO = require("../daos/CaracteristicaDAO");
const InfoCliente = require("../models/InfoCliente");
const PersonaDAO = require("../daos/PersonaDAO");
const ClienteDAO = require("../daos/ClienteDAO");
const EjecutaFlujo = require("../helpers/EjecutaFlujo");
const DatosPersonales = require("../helpers/DatosPersonales");
const Desencriptar = require("../helpers/Desencripta");

class Entrada {

    constructor() {
    }

    static async procesa(datos) {
        logger.info(" ::: Inicia proceso de ambientacion usuarios " + JSON.stringify(datos) + " :::");
        Peticion.valida(datos);
    
        var eventosEjecutar = new Array();
        var flujosdao = new FlujoDAO();
        var flujo = await flujosdao.buscar(datos.flujo).then().catch(error => {
            throw error;
        });
        eventosEjecutar = flujo.servicios;
    
        if (datos.caracteristicas.length > 0) {
            var caracteristicasdao = new CaracteristicaDAO();
            var caracteristicas = await caracteristicasdao.compatibles(datos.flujo).then().catch(error => {
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
        var personadao = new PersonaDAO();
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
                            datos.infoCliente = await personadao.creaPersona(datos.numUsuarios, datos.infoCliente).catch(err => {
                                throw err;
                            });
                        }
                        validaciones.iteraInfo(datos.infoCliente, datos.flujo);
                    }
                } else {
                    datos.infoCliente = await personadao.creaPersona(datos.numUsuarios, null).catch(err => {
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
                let clientedao = new ClienteDAO();
                var objSal = await clientedao.guardar(respuesta[i]);
                arregloSalida.push(objSal.toJSON());
            }
        } else {
            arregloSalida = respuesta;
        }
    
        return arregloSalida;
    }

    static async reProcesa(datos) {
        logger.info(" ::: Inicia proceso de re ambientacion usuarios " + JSON.stringify(datos) + " :::");

        Peticion.valida2(datos);
    
        var id = datos.id;
        var respuesta = new Object();
    
        let clientedao = new ClienteDAO();
        var activa = await clientedao.activar(id).then().catch(err => {
            throw err;
        });
    
        if (activa.ok == 1) {
            var encuentra = await clientedao.get(id).then().catch(error => {
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
    
            borrado = await clientedao.eliminaCliente(id).then().catch(err => {
                throw err;
            });
            
        } else {
            throw new Error('Error al activar cliente');
        }
    
        return respuesta;
    }

}

module.exports = Entrada;
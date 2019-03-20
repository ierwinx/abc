var logger = require('log4js').getLogger("Entrada");
var peticion = require('../models/peticion');
var flujosDAO = require("../daos/flujoDAO");
var caracteristicaDAO = require("../daos/caracteristicaDAO");
var infoClientes = require("../models/infoCliente");
var personaDAO = require("../daos/personaDAO");
var clienteDAO = require("../daos/clienteDAO");
var EjecutaFlujo = require("../helpers/EjecutaFlujo");
var DatosPersonales = require("../helpers/datosPersonales");

var procesa = async(datos) => {
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

    if (datos.infoCliente.length > 0) {
        if (infoClientes.CrearUsuario(datos.infoCliente[0])) {
            datos.infoCliente.forEach(element => {
                infoClientes.validaFlujo(element, datos.flujo);
            });
        } else {
            if (datos.flujo < 7) {
                datos.infoCliente = await personaDAO.creaPersona(datos.numUsuarios, datos.infoCliente).catch(err => {
                    throw err;
                });
            }
            datos.infoCliente.forEach(element => {
                infoClientes.validaFlujo(element, datos.flujo);
            });
        }
    } else {
        datos.infoCliente = await personaDAO.creaPersona(datos.numUsuarios, null).catch(err => {
            throw err;
        });
    }

    if (datos.flujo < 7) {
        datos.infoCliente = DatosPersonales.cambiaMayusculas(datos.infoCliente);
    }

    var respuesta = new Array();
    for (var i = 0; i < datos.infoCliente.length; i++) {
        var cliente = new Object();
        for (var j = 0; j < eventosEjecutar.length; j++) {
            cliente = await EjecutaFlujo.procesa(datos.infoCliente[i], eventosEjecutar[j]).then().catch(err => {
                throw err;
            });
        }
        if (!datos.usuarioLogin) {
            cliente.usuarioLogin = "364088";
        } else {
            cliente.usuarioLogin = datos.usuarioLogin;
        }
        cliente.descFlujo = flujo.nombreFlujo;
        cliente.estatusCliente = true;
        cliente.flujo = datos.flujo;
        respuesta.push(cliente);
    }
    respuesta.forEach(element => {
        clienteDAO.guardar(element);
    });

    return respuesta;
}

var reProcesa = async(datos) => {
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

module.exports = {
    procesa,
    reProcesa
}
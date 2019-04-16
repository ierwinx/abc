const logger = require('log4js').getLogger("Cuentas");
const soap = require('soap');

class Cuentas {

    constructor() {
    }

    MB80(objeto) {
        var servicio = new Promise((resolve, reject) => {
            logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta Digital :::");
    
            var entity = '0127';
            var branch = '0172';
            var user = 'B243454';
            var terminal = 'WE50';
            var chanel = '01';
    
            var tipoOper = '6';
            var celular = objeto.numCel;
            var numeroCliente = objeto.noClienteAlnova;
            var nivelCuenta = 'N2';
            var idTelefono = objeto.idTel;
            var bdmid = objeto.icu;
            var sisTel = objeto.sisTel;
            var sisOper = objeto.sisOper;
            var latitud = "19.2968114";
            var longitud = "-99.1859132";
            
            var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
            var args = {
                mtIdTransaccion: 'MB80', 
                mtDatosEntrada:  'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~TIPOPER/' + tipoOper + '~TELCEL/' + celular + '~NUMCTE/' + numeroCliente + '~NIVCTA/' + nivelCuenta + '~IDTEL/' + idTelefono + '~SISTEL/' + sisTel + '~SISOPER/' + sisOper + '~BDMID/' + bdmid + '~LATITUD/' + latitud + '~LONGTUD/' + longitud
            };
    
            logger.info("POST : " + JSON.stringify(Cuentas.creaObjeto(args.mtDatosEntrada)));
            soap.createClient(url, function(err, client) {
                client.MTEjecutaTransaccion(args, function(err2, result) {
                    if (err2 == null) {
                        var respuesta = Cuentas.creaObjeto(result.MTEjecutaTransaccionResult);
                        logger.info("Respuesta: " + JSON.stringify(respuesta));
                        if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio MB80 de Alnova ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio MB80  de Alnova"));
                        } else {
                            if (respuesta.CTACTE){
                                objeto.cuentaCliente = respuesta.CTACTE;
                                resolve(objeto);
                            } else {
                                logger.error(" ::: Ocurrio un Error con el consumo del servicio MB80  de Alnova ::: ");
                                reject(new Error("Ocurrio un Error con el consumo del servicio MB80  de Alnova"));
                            }
                        }
                    } else {
                        reject(new Error("Ocurrio un Error con el consumo del servicio MB80  de Alnova"));
                    }
                });
            });
        });
    
        return servicio;
    }

    MB34(objeto) {
        var servicio = new Promise((resolve, reject) => {
            logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta Digital:::");
    
            var entity = '0127';
            var branch = '0172';
            var user = 'B243454';
            var terminal = 'WE50';
            var chanel = '01';

            var idAlnova = objeto.noClienteAlnova;
            var producto = '16';
            //var producto = '14';
            var subproducto = '0018'
            //var subproducto = '0035';
            var montoAp = '000000000000000'
            
            var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
            var args = {
                mtIdTransaccion: 'MB34', 
                mtDatosEntrada: 'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~IDALNOV/' + idAlnova + '~PRODUCT/' + producto + '~SUBPROD/' + subproducto + '~MONTOAP/' + montoAp
            };
    
            logger.info("POST : " + args.mtDatosEntrada);
            soap.createClient(url, function(err, client) {
                client.MTEjecutaTransaccion(args, function(err2, result) {
                    if (err2 == null) {
                        var respuesta = Cuentas.creaObjeto(result.MTEjecutaTransaccionResult);
                        logger.info("Respuesta: " + JSON.stringify(respuesta));
                        if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio de MB34 de Alnova ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio de MB34 de Alnova"));
                        } else {
                            if (respuesta.NUMACCO) {
                                objeto.cuentaCliente = respuesta.NUMACCO;
                                resolve(objeto);
                            } else {
                                logger.error("Ocurrio un Error con el consumo del servicio de MB34 de Alnova");
                                reject(new Error("Ocurrio un Error con el consumo del servicio de MB34 de Alnova"));
                            }
                        }
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio de MB34 de Alnova ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de MB34 de Alnova"));
                    }
                });
            });
        });
    
        return servicio;
    }

    BB02(objeto) {
        var servicio = new Promise((resolve, reject) => {
            logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta :::");
            
            var entity = '0127';
            var branch = '0172';
            var user = 'B243454';
            var terminal = 'WE50';
            var chanel = '01';
            var funcion = 'AP';
            var referencia = this.agregaEspacios(this.generaReferencia());
    
            var producto = '13';
            var entidad = '0127';
            var sucursal = '0673';
            var nEmpleado = '00000000';
            var subproducto = '0017';
            var numeroCliente = objeto.idAlnova;
            var divisa = 'MXP';
            var monto = '0000000000000000';
            var codigo = '000';
    
            var entrada = producto + entidad + sucursal + nEmpleado + subproducto + numeroCliente + divisa + monto + codigo;
    
            var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
            var args = {
                mtIdTransaccion: 'BB02',
                mtDatosEntrada: 'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~FUNCION/'+funcion+'~REFEREN/'+referencia+'~ENTRADA/'+entrada+'~SALIDA/'
            };
    
            logger.info("POST : " + JSON.stringify(Cuentas.creaObjeto(args.mtDatosEntrada)));
            soap.createClient(url, function(err, client) {
                client.MTEjecutaTransaccion(args, function(err2, result) {
                    if (err2 == null) {
                        var respuesta = Cuentas.creaObjeto(result.MTEjecutaTransaccionResult);
                        logger.info("Respuesta: " + JSON.stringify(respuesta));
                        if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                            logger.error(" ::: Ocurrio un Error con el consumo del servicio de MB02 de Alnova ::: ");
                            reject(new Error("Ocurrio un Error con el consumo del servicio de MB02 de Alnova"));
                        } else {
                            if (respuesta.ACC) {
                                objeto.cuentaCliente = respuesta.ACC;
                                resolve(objeto);
                            } else {
                                logger.error(" ::: Ocurrio un Error con el consumo del servicio de MB02 de Alnova ::: ");
                                reject(new Error("Ocurrio un Error con el consumo del servicio de MB02 de Alnova"));
                            }
                        }
                    } else {
                        logger.error(" ::: Ocurrio un Error con el consumo del servicio de MB02 de Alnova ::: ");
                        reject(new Error("Ocurrio un Error con el consumo del servicio de MB02 de Alnova"));
                    }
                });
            });
        });
    
        return servicio;
    }

    agregaEspacios(input) {
        var length = 50;
        var padding = ' ';
        var str = input + "";
        return (length <= str.length) ? str : this.agregaEspacios(str+padding, length, padding);
    }

    agregaEspacios2(input) {
        var letras = ['A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'O' ,'P', 'Q', 'R', 'S', 'T', 'U', 'V' , 'X', 'Y', 'Z'];

        var length = 20;
        var padding = letras[Math.floor(Math.random() * letras.length)];
        var str = input + "";
        return (length <= str.length) ? str : this.agregaEspacios2(padding+str, length, padding);
    }

    generaReferencia() {
        var referencia = Math.floor(Math.random() * 99999999999999999999);
        return referencia;
    }

    static creaObjeto(cadena) {
        var divide = cadena.split('~');
        var salida = new Object();
        divide.forEach(element => {
            var obj = element.split('/');
            var nombre = obj[0];
            var contenido = obj[1];
            salida[nombre] = contenido;
        });
    
        return salida;
    }

}

module.exports = Cuentas;
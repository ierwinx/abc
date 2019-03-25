const logger = require('log4js').getLogger("Cuentas");
const soap = require('soap');

var MB80 = (objeto) => {

    let servicio = new Promise((resolve, reject) => {
        logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta Digital :::");

        entity = '0127';
        branch = '0172';
        user = 'B243454';
        terminal = 'WE50';
        chanel = '01';

        tipoOper = '6';
        celular = objeto.numCel;
        numeroCliente = objeto.noClienteAlnova;
        nivelCuenta = 'N2';
        idTelefono = objeto.idTel;
        bdmid = objeto.bdmid;
        sisTel = objeto.sisTel;
        sisOper = objeto.sisOper;
        latitud = objeto.latitud;
        longitud = objeto.longitud;
        
        var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
        var args = {
            mtIdTransaccion: 'MB80', 
            mtDatosEntrada:  'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~TIPOPER/' + tipoOper + '~TELCEL/' + celular + '~NUMCTE/' + numeroCliente + '~NIVCTA/' + nivelCuenta + '~IDTEL/' + idTelefono + '~SISTEL/' + sisTel + '~SISOPER/' + sisOper + '~BDMID/' + bdmid + '~LATITUD/' + latitud + '~LONGTUD/' + longitud
        };

        logger.info("POST : " + args.mtDatosEntrada);
        soap.createClient(url, function(err, client) {
            client.MTEjecutaTransaccion(args, function(err2, result) {
                if (err2 == null) {
                    if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                        logger.error(" ::: Ocurrio un error con el consumo del servicio MB80 ::: ");
                        reject(new Error("Ocurrio un error con el consumo del servicio MB80"));
                    } else {
                        var respuesta = creaObjeto(result.MTEjecutaTransaccionResult);
                        if (respuesta.CTACTE){
                            objeto.cuentaCliente = respuesta.CTACTE;
                            resolve(objeto);
                        } else {
                            logger.error(" ::: Ocurrio un error con el consumo del servicio MB80 ::: ");
                            reject(new Error("Ocurrio un error con el consumo del servicio MB80"));
                        }
                    }
                } else {
                    reject(new Error("Ocurrio un error con el consumo del servicio MB80"));
                }
            });
        });
    });

    return servicio;
};

var MB34 = (objeto) => {

    let servicio = new Promise((resolve, reject) => {
        logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta Digital:::");

        entity = '0127';
        branch = '0172';
        user = 'B243454';
        terminal = 'WE50';
        chanel = '01';

        idAlnova = objeto.noClienteAlnova;
        producto = '16';
        //producto = '14';
        subproducto = '0018'
        //subproducto = '0035';
        montoAp = '000000000000000'
        
        var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
        var args = {
            mtIdTransaccion: 'MB34', 
            mtDatosEntrada: 'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~IDALNOV/' + idAlnova + '~PRODUCT/' + producto + '~SUBPROD/' + subproducto + '~MONTOAP/' + montoAp
        };

        logger.info("POST : " + args.mtDatosEntrada);
        soap.createClient(url, function(err, client) {
            client.MTEjecutaTransaccion(args, function(err2, result) {
                if (err2 == null) {
                    if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                        logger.error(" ::: Ocurrio un error con el consumo del servicio de MB34 ::: ");
                        reject(new Error("Ocurrio un error con el consumo del servicio de MB34"));
                    } else {
                        var respuesta = creaObjeto(result.MTEjecutaTransaccionResult);
                        if (respuesta.NUMACCO) {
                            objeto.cuentaCliente = respuesta.NUMACCO;
                            resolve(objeto);
                        } else {
                            logger.error("Ocurrio un error con el consumo del servicio de MB34");
                            reject(new Error("Ocurrio un error con el consumo del servicio de MB34"));
                        }
                    }
                } else {
                    logger.error(" ::: Ocurrio un error con el consumo del servicio de MB34 ::: ");
                    reject(new Error("Ocurrio un error con el consumo del servicio de MB34"));
                }
            });
        });
    });

    return servicio;
};

var BB02 = (objeto) => {

    let servicio = new Promise((resolve, reject) => {
        logger.info(" ::: se consulta servicio soap de ALNOVA para Apertura de cuenta :::");
        
        entity = '0127';
        branch = '0172';
        user = 'B243454';
        terminal = 'WE50';
        chanel = '01';
        funcion = 'AP';
        referencia = agregaEspacios(generaReferencia());

        producto = '13';
        entidad = '0127';
        sucursal = '0673';
        nEmpleado = '00000000';
        subproducto = '0017';
        numeroCliente = objeto.idAlnova;
        divisa = 'MXP';
        monto = '0000000000000000';
        codigo = '000';

        entrada = producto + entidad + sucursal + nEmpleado + subproducto + numeroCliente + divisa + monto + codigo;

        var url = 'http://10.63.32.115/Conexion_TF/Servicio_Conexion.asmx?WSDL';
        var args = {
            mtIdTransaccion: 'BB02',
            mtDatosEntrada: 'ENTITY/'+entity+'~BRANCH/'+branch+'~USER/'+user+'~TERMINAL/'+terminal+'~CHANNEL/'+chanel+'~FUNCION/'+funcion+'~REFEREN/'+referencia+'~ENTRADA/'+entrada+'~SALIDA/'
        };

        logger.info("POST : " + args.mtDatosEntrada);
        soap.createClient(url, function(err, client) {
            client.MTEjecutaTransaccion(args, function(err2, result) {
                if (err2 == null) {
                    if (result.MTEjecutaTransaccionResult.indexOf("Error") > -1) {
                        logger.error(" ::: Ocurrio un error con el consumo del servicio de MB02 ::: ");
                        reject(new Error("Ocurrio un error con el consumo del servicio de MB02"));
                    } else {
                        var respuesta = creaObjeto(result.MTEjecutaTransaccionResult);
                        if (respuesta.ACC) {
                            objeto.cuentaCliente = respuesta.ACC;
                            resolve(objeto);
                        } else {
                            logger.error(" ::: Ocurrio un error con el consumo del servicio de MB02 ::: ");
                            reject(new Error("Ocurrio un error con el consumo del servicio de MB02"));
                        }
                    }
                } else {
                    logger.error(" ::: Ocurrio un error con el consumo del servicio de MB02 ::: ");
                    reject(new Error("Ocurrio un error con el consumo del servicio de MB02"));
                }
            });
        });
    });

    return servicio;
};

agregaEspacios = (input) => {
    var length = 50;
    var padding = ' ';
    var str = input + "";
    return (length <= str.length) ? str : agregaEspacios(str+padding, length, padding);
}

agregaEspacios2 = (input) => {
    var letras = ['A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'O' ,'P', 'Q', 'R', 'S', 'T', 'U', 'V' , 'X', 'Y', 'Z'];

    var length = 20;
    var padding = letras[Math.floor(Math.random() * letras.length)];
    var str = input + "";
    return (length <= str.length) ? str : agregaEspacios(padding+str, length, padding);
}

generaReferencia = () => {
    var referencia = Math.floor(Math.random() * 99999999999999999999);
    return referencia;
}

creaObjeto = (cadena) => {
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

module.exports = {
    MB80,
    MB34,
    BB02,
    agregaEspacios
}
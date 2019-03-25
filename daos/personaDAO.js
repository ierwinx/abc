const logger = require('log4js').getLogger("personaDAO");
const Persona = require('../models/persona');
const GeneraCurp = require("../services/CU/Curp");

var guardar = async(objeto) => {
    logger.info(" ::: Guarda Informacion de una Persona :::");
    var persona = new Persona(objeto);
    var errores = persona.validateSync();
    if (errores) {
        logger.error(" ::: Ocurrio un Error el las validaciones al guarda una persona :::");
        throw new Error(errores.message.replace('persona validation failed: ','ValidationError: '));
    } else {
        return await persona.save();
    }
}

var actualizar = async(objeto) => {
    logger.info(" ::: Actualiza la Informacion de una Persona por ID :::");
    var persona = new Persona(objeto);
    var errores = persona.validateSync();
    if (errores) {
        logger.error(" ::: Ocurrio un Error el las validaciones al actualizar una persona :::");
        throw new Error(errores.message.replace('persona validation failed: ','ValidationError: '));
    } else {
        return await persona.findOneAndUpdate({ _id: objeto._id}, objeto).exec();
    }
}

var eliminar = async(id) => {
    logger.info(" ::: Elimina una Persona por ID :::");
    var respuesta = await Persona.deleteOne({ _id: id }).exec();
    return respuesta;
}

var listar = async() => {
    logger.info(" ::: Consulta todas las Personas :::");
    var respuesta = await Persona.find();
    return respuesta;
}

var buscar = async(id) => {
    logger.info(" ::: Consulta una Persona por ID :::");
    var respuesta = await Persona.findOne({ _id: id });
    if (respuesta) {
        return respuesta;
    } else {
        throw new Error(`No se encontraron resultados para la Persona ${id}`);
    }
}

var total = async() => {
    logger.info(" ::: Cuenta todo las Persona en db :::");
    var respuesta = await Persona.countDocuments().exec();
    return respuesta;
}

var creaPersona = async(cantidad, complemento) => {
    logger.info(" ::: Crea una persona apartir de datos existentes :::");
    var respuesta = new Array();

    for (var x = 0; x < cantidad; x++) {
        var total = await Persona.countDocuments().exec();
        var personaEncontradas = new Array();
        var cant = 5;
        var encuentraCIC = false;
        var cicValor = '';
        var numeroEmisionValor = '';
        var claveElectorValor = '';
        var vigenciaValor = '';
        var ocrValor = '';
        for (i = 0; i <= cant; i++) {
            var random = Math.floor(Math.random() * total);
            var persona = await Persona.findOne().skip(random).exec();
            if (persona.cic != undefined) {
                if (persona.cic != '') {
                    encuentraCIC = true;
                    cicValor = persona.cic;
                } else {
                    ocrValor = persona.ocr;
                }
            } else {
                ocrValor = persona.ocr;
            }
            vigenciaValor = persona.vigencia;
            numeroEmisionValor = persona.numeroEmision;
            claveElectorValor = persona.claveElector;
            personaEncontradas.push(persona);
        }

        var idIdentificacionIFE = valida(personaEncontradas[Math.floor(Math.random() * cant)].idIdentificacion);
        if (idIdentificacionIFE == "") {
            idIdentificacionIFE = "2";
        }

        var nueva = {
            icu: valida(personaEncontradas[Math.floor(Math.random() * cant)].icu),
            nombre: valida(personaEncontradas[Math.floor(Math.random() * cant)].nombre),
            apellidoP: valida(personaEncontradas[Math.floor(Math.random() * cant)].apPaterno),
            apellidoM: valida(personaEncontradas[Math.floor(Math.random() * cant)].apMaterno),
            genero: valida(personaEncontradas[Math.floor(Math.random() * cant)].genero),
            numCel: valida(personaEncontradas[Math.floor(Math.random() * cant)].celular),
            telefonoDomicilio: valida(personaEncontradas[Math.floor(Math.random() * cant)].telCasa),
            correo: valida(personaEncontradas[Math.floor(Math.random() * cant)].email),
            fechaNac: valida(personaEncontradas[Math.floor(Math.random() * cant)].fechaNacimiento),
            idIdentificacion: idIdentificacionIFE,
            calle: valida(personaEncontradas[Math.floor(Math.random() * cant)].calle),
            numExt: valida(personaEncontradas[Math.floor(Math.random() * cant)].numExt),
            numInt: valida(personaEncontradas[Math.floor(Math.random() * cant)].numInt),
            cp: valida(personaEncontradas[Math.floor(Math.random() * cant)].cp),
            colonia: valida(personaEncontradas[Math.floor(Math.random() * cant)].colonia),
            delegacion: valida(personaEncontradas[Math.floor(Math.random() * cant)].delegacion),
            idEntidadFederativa: valida(personaEncontradas[Math.floor(Math.random() * cant)].cveEntidadNacimiento),
            paisCu: valida(personaEncontradas[Math.floor(Math.random() * cant)].pais_cu),
            canalCu: valida(personaEncontradas[Math.floor(Math.random() * cant)].canal_cu),
            sucursalCu: valida(personaEncontradas[Math.floor(Math.random() * cant)].sucursal_cu),
            folioCu: valida(personaEncontradas[Math.floor(Math.random() * cant)].folio_cu),
            tipoCte: valida(personaEncontradas[Math.floor(Math.random() * cant)].tipoCte),
            descripcionCte: valida(personaEncontradas[Math.floor(Math.random() * cant)].descripcionCte),
            idAlnova: valida(personaEncontradas[Math.floor(Math.random() * cant)].idAlnova),
            idNegocio: valida(personaEncontradas[Math.floor(Math.random() * cant)].idNegocio),
            idCanal: valida(personaEncontradas[Math.floor(Math.random() * cant)].idCanal),
            idCliente: valida(personaEncontradas[Math.floor(Math.random() * cant)].idCliente),
            digVer: valida(personaEncontradas[Math.floor(Math.random() * cant)].digVer),
            usuario: valida(personaEncontradas[Math.floor(Math.random() * cant)].usuario),
            password: valida(personaEncontradas[Math.floor(Math.random() * cant)].password),
            token: valida(personaEncontradas[Math.floor(Math.random() * cant)].token),
            foto: valida(personaEncontradas[Math.floor(Math.random() * cant)].foto),
            huella1: valida(personaEncontradas[Math.floor(Math.random() * cant)].huella),
            mano1: valida(personaEncontradas[Math.floor(Math.random() * cant)].mano),
            dedo1: valida(personaEncontradas[Math.floor(Math.random() * cant)].dedo),
            idNacionalidad: valida(personaEncontradas[Math.floor(Math.random() * cant)].idNacionalidad),
            estado: valida(personaEncontradas[Math.floor(Math.random() * cant)].estado),
            nivelCte: valida(personaEncontradas[Math.floor(Math.random() * cant)].nivelCte),
            anioRegistro : valida(personaEncontradas[Math.floor(Math.random() * cant)].anioRegistro),
            vigencia : valida(personaEncontradas[Math.floor(Math.random() * cant)].vigencia),
            anioEmision: "",
            situacionRegistral: "",
            tipoReporte: "",
            ocr: encuentraCIC ? '' : valida(ocrValor),
            numeroEmision: valida(numeroEmisionValor),
            claveElector: valida(claveElectorValor),
            cic: encuentraCIC ? valida(cicValor) : '',
            vigencia: valida(vigenciaValor)
        }

        var curpRFC = await GeneraCurp.obtiene(nueva).catch(err=> {
            throw err;
        });

        nueva.curp = curpRFC.curp;
        nueva.rfc = curpRFC.rfc;

        if (complemento) {
            // INE
            if (complemento[x].cic) {
                nueva.cic = complemento[x].cic ? complemento[x].cic : "";
            } else if (complemento.ocr && complemento[x].numeroEmision && complemento[x].claveElector) {
                nueva.ocr = complemento[x].ocr ? complemento[x].ocr : "";
                nueva.numeroEmision = complemento[x].numeroEmision ? complemento[x].numeroEmision : "";
                nueva.claveElector = complemento[x].claveElector ? complemento[x].claveElector : "";
            }

            // CEL
            if (complemento[x].bdmid) {
                nueva.idTel = complemento[x].idTel ? complemento[x].idTel : "";
                nueva.numCel = complemento[x].numCel ? complemento[x].numCel : "";
                nueva.bdmid = complemento[x].bdmid ? complemento[x].bdmid : "";
                nueva.sisTel = complemento[x].sisTel ? complemento[x].sisTel : "";
                nueva.latitud = complemento[x].latitud ? complemento[x].latitud : "";
                nueva.longitud = complemento[x].longitud ? complemento[x].longitud : "";
                nueva.sisOper = complemento[x].sisOper ? complemento[x].sisOper : "";
            }

            // EXT 
            if (complemento[x].pushId) {
                nueva.codigoPais = complemento[x].codigoPais ? complemento[x].codigoPais : "";            
                nueva.pushId = complemento[x].pushId ? complemento[x].pushId : "";
                nueva.tipoDispositivo = complemento[x].tipoDispositivo ? complemento[x].tipoDispositivo : "";
                nueva.infoHash = complemento[x].infoHash ? complemento[x].infoHash : "";
                nueva.aceptaPublicidad = complemento[x].aceptaPublicidad ? complemento[x].aceptaPublicidad : "";
                nueva.comparteDatos = complemento[x].comparteDatos ? complemento[x].comparteDatos : "";
            }
            
        }

        respuesta.push(nueva);

    }

    return respuesta;
}

var valida = function(datos) {
    var salida = "";
    if (datos != undefined) {
        salida = datos;
    }
    return salida;
}

module.exports = {
    guardar,
    eliminar,
    actualizar,
    listar,
    buscar,
    total,
    creaPersona
}
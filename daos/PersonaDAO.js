const logger = require('log4js').getLogger("PersonaDAO");
const Persona = require('../models/persona');
const Curp = require("../services/CU/Curp");

class PersonaDAO {

    constructor() {
    }

    async guardar(objeto) {
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

    async actualizar(objeto) {
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

    async eliminar(id) {
        logger.info(" ::: Elimina una Persona por ID :::");
        var respuesta = await Persona.deleteOne({ _id: id }).exec();
        return respuesta;
    }

    async listar() {
        logger.info(" ::: Consulta todas las Personas :::");
        var respuesta = await Persona.find();
        return respuesta;
    }

    async buscar(id) {
        logger.info(" ::: Consulta una Persona por ID :::");
        var respuesta = await Persona.findOne({ _id: id });
        if (respuesta) {
            return respuesta;
        } else {
            throw new Error(`No se encontraron resultados para la Persona ${id}`);
        }
    }

    async total() {
        logger.info(" ::: Cuenta todo las Persona en db :::");
        var respuesta = await Persona.countDocuments().exec();
        return respuesta;
    }

    async valida(datos) {
        var salida = "";
        if (datos != undefined) {
            salida = datos;
        }
        return salida;
    }

    async creaPersona(cantidad, complemento) {
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
            for (let i = 0; i <= cant; i++) {
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
    
            var idIdentificacionIFE = this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idIdentificacion);
            if (idIdentificacionIFE == "") {
                idIdentificacionIFE = "2";
            }
    
            var nueva = {
                icu: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].icu),
                nombre: await await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].nombre),
                apellidoP: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].apPaterno),
                apellidoM: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].apMaterno),
                genero: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].genero),
                numCel: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].celular),
                telefonoDomicilio:await  this.valida(personaEncontradas[Math.floor(Math.random() * cant)].telCasa),
                correo: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].email),
                fechaNac: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].fechaNacimiento),
                idIdentificacion: await idIdentificacionIFE,
                calle: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].calle),
                numExt: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].numExt),
                numInt: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].numInt),
                cp: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].cp),
                colonia: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].colonia),
                delegacion: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].delegacion),
                idEntidadFederativa: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].cveEntidadNacimiento),
                paisCu: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].pais_cu),
                canalCu: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].canal_cu),
                sucursalCu: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].sucursal_cu),
                folioCu: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].folio_cu),
                tipoCte: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].tipoCte),
                descripcionCte: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].descripcionCte),
                idAlnova: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idAlnova),
                idNegocio: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idNegocio),
                idCanal: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idCanal),
                idCliente: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idCliente),
                digVer: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].digVer),
                usuario: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].usuario),
                password: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].password),
                token: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].token),
                foto: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].foto),
                huella1: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].huella),
                mano1: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].mano),
                dedo1: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].dedo),
                idNacionalidad: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].idNacionalidad),
                estado: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].estado),
                nivelCte: await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].nivelCte),
                anioRegistro : await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].anioRegistro),
                vigencia : await this.valida(personaEncontradas[Math.floor(Math.random() * cant)].vigencia),
                anioEmision: "",
                situacionRegistral: "",
                tipoReporte:  "",
                ocr: encuentraCIC ? '' : await this.valida(ocrValor),
                numeroEmision: await this.valida(numeroEmisionValor),
                claveElector: await this.valida(claveElectorValor),
                cic: encuentraCIC ? await this.valida(cicValor) : '',
                vigencia: await this.valida(vigenciaValor)
            }
    
            var curpRFC = await Curp.obtiene(nueva).catch(err=> {
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

}

module.exports = PersonaDAO;
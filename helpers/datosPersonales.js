const logger = require('log4js').getLogger("DatosPersonales");
const GeneraCurpWS = require("../services/CU/Curp");

class DatosPersonales {

    constructor() {
    }

    generaRFC(datos) {
        logger.info("::: Genera una rfc aleatorio :::");
        return generaCurp(datos).substr(0, 10) + '000';
    }

    async generaCurp(datos) {
        logger.info("::: Genera una curp aleatoria :::");
        var curp = "";
        try {
            var hombres = "A4"; //generico
            var mujeres = "A8"; //generico
        
            var primerApellido = quitaCaracteres(datos.apellidoP.substr(0, 2));
            var segundoApellido = quitaCaracteres(datos.apellidoM.substr(0, 1));
            var nombre = quitaCaracteres(datos.nombre.substr(0, 1));
        
            var anio = datos.fechaNac.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g, '$3').substr(2, 4);
            var mes = datos.fechaNac.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g, '$2');
            var dia = datos.fechaNac.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g, '$1');
        
            var sexo = DatosPersonales.cambiaGenero(datos.genero);
            var digitosPrefinales = ['B','C','D'];
        
            var armardigotosPrefinales = digitosPrefinales[Math.floor(Math.random() * digitosPrefinales.length)] + digitosPrefinales[Math.floor(Math.random() * digitosPrefinales.length)] + digitosPrefinales[Math.floor(Math.random() * digitosPrefinales.length)]
        
            var validaFinal = armardigotosPrefinales + (sexo == 'H' ? hombres : mujeres);
        
            /*var entidadEncontrada = await EntidadDAO.get(datos.idEntidadFederativa).catch(err => {
                return err;
            });*/
            var estado = "DF"; // entidadEncontrada.abre;
        
            curp = primerApellido + segundoApellido + nombre + anio + mes + dia + sexo + estado + validaFinal;
        } catch(error) {
            logger.info("::: Error al generar curp :::");
            throw new Error("Error al generar curp");
        }
        return curp;
    }

    static cambiaGenero(genero) {
        var resultado = "";
        if (genero == 'F') {
            resultado = 'M';
        }
        if (genero == 'M') {
            resultado = "H";
        }
        return resultado;
    }

    cambiaMayusculas(arreglo) {
        logger.info("::: Cambia datos de minusculas a mayusculas :::");
        var salida = new Array();
        arreglo.forEach(element => {
            element.nombre = element.nombre.toUpperCase();
            element.apellidoP = element.apellidoP.toUpperCase();
            element.apellidoM = element.apellidoM ? element.apellidoM.toUpperCase() : "";
    
            if (element.calle) {
                element.calle = element.calle.toUpperCase();
                element.colonia = element.colonia.toUpperCase();
                element.delegacion = element.delegacion.toUpperCase();
                element.estado = element.estado.toUpperCase();
            }
            salida.push(element);
        });
        return salida;
    }

    quitaCaracteres(cadena) {
        var letras = ['Á','É', 'Í', 'Ó', 'Ú', 'Ü', 'Ñ'];
        var letrasRem = ['A','E', 'I', 'O', 'U', 'U', 'X'];
    
        var resp = "";
        cadena = cadena.toUpperCase();
        var encontrada = cadena.split("");
        for (var i = 0; i < letras.length; i++) {
            for (var j = 0; j < encontrada.length; j++) {
                if (letras[i] === encontrada[j]) {
                    encontrada[j] = letrasRem[i];
                }
            }
        }
        encontrada.forEach(element => {
            resp += element
        });
        return resp;
    }

    concatenaDatos(fecha, cadena) {
        return fecha + '|' + cadena;
    }

    generaMenorEdad(datos) {
        logger.info("::: Inicia generacion de menor edad :::");
        try {
            var mes = datos.fechaNac.split("/")[1];
            var dia = datos.fechaNac.split("/")[0];
        
            var fechaActual = new Date();
            var anioActual = fechaActual.getFullYear();
        
            var edades = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
            var nuevoAnio = anioActual - edades[Math.floor(Math.random() * edades.length)];
            
            datos.fechaNac = (dia.length == 2 ? dia : "0" + dia) + "/" + (mes.length == 2 ? mes : "0" + mes) + "/" + nuevoAnio;
        
            var curpRFC = GeneraCurpWS.obtiene(datos);
    
            datos.curp = curpRFC.curp;
            datos.rfc = curpRFC.rfc;
    
        } catch(error) {
            logger.error("::: Error al generar un menor de edad :::");
            throw new Error("Error al generar un menor de edad");
        }
    
        return datos;
    }

}

module.exports = DatosPersonales;
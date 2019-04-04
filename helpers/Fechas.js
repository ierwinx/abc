
class Fechas {

    constructor() {
    }

    static horaActual() {
        var fecha = new Date();
        var hora = fecha.getHours();
        var minutos = fecha.getMinutes();
        var segundos = fecha.getSeconds();
        return hora + ":" + ((minutos + "").length == 1 ? "0"+minutos : minutos) + ":" + ((segundos + "").length == 1 ? "0"+segundos : segundos);
    }

}

module.exports = Fechas;
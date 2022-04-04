
class Jugador {
    constructor(nombre){
        this.nombre = nombre;
        this.listo = false;
    }

    marcarListo(){
        this.listo = true;
    }
}

module.exports = Jugador;
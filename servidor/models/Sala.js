var Tablero = require('./Tablero.js')

class Sala {
    constructor(nombre) {
        this.nombre = nombre;
        this.tablero = new Tablero();
        this.jugadores = [];
    }

    insertarJugador(jugador) {
        this.jugadores.push(jugador);
    }

    encontrarJugador(nombre) {
        return this.jugadores.find(jugador => jugador.nombre === nombre);
    }

    estaLista() {
        return this.jugadores.length > 1 && this.jugadores[0].listo && this.jugadores[1].listo;
    }
}

module.exports = Sala;
class ListaSalas {

    constructor() {
        this.listaSalas = [];
        this.siguienteId = 1;
    }
    crearSala(sala) {
        sala.id = this.siguienteId;
        this.listaSalas.push(sala);
        this.siguienteId++;
        return sala;
    }
    /*
    Generamos las Id apartir de siguienteId, porque si usaramos el tamaño de listaSalas
    cuando borremos salas se repetiran las id's.
    */
    borrarSala(id) {
        for (var i = 0; i < this.listaSalas.length; i++) {
            if (this.listaSalas[i].id === parseInt(id)) return this.listaSalas.splice(i, 1); // splice guarda el cambio permanentemente.
        }
        return null; // Si no existe la sala
    }

    buscarSalaId(id) {
        var sala = this.listaSalas.find(function (sala) {
            return sala.id === parseInt(id); // Si es verdadero devuelve la sala.
        })
        return sala || null; // Si devuelve null, no encuentra la sala.
    }

    devuelveSalas() {
        return this.listaSalas.map(sala => {
            return {
                id: sala.id,
                nombre: sala.nombre,
                jugadores: sala.jugadores
            }
        })
    }
}

module.exports = ListaSalas;
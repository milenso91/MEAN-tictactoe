class Tablero {


    constructor() {
        this.rejilla = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.movimientosDisponibles = 9;
    }


    marcar(posicion, jugador) {
        this.rejilla[posicion[0]][posicion[1]] = jugador;
        this.movimientosDisponibles--;
    }
    comprobarVictoria(posicion) {
        var fila = posicion[0];
        var columna = posicion[1];
        var filaSeleccionada = this.rejilla[fila];
        var columnaSeleccionada = [this.rejilla[0][columna], this.rejilla[1][columna], this.rejilla[2][columna]];

        if (filaSeleccionada[0] === filaSeleccionada[1] && filaSeleccionada[1] === filaSeleccionada[2]) {
            return true;
        }
        if (columnaSeleccionada[0] === columnaSeleccionada[1] && columnaSeleccionada[1] === columnaSeleccionada[2]) {
            return true;
        }
        var diagonalUno = [[0, 0], [1, 1], [2, 2]];
        var diagonalDos = [[0, 2], [1, 1], [2, 0]];
        // Es necesario poner un .bind(this) para que se pueda utilizar dentro de la funcion this.rejilla
        if (posicionEstaEnArray(posicion, diagonalUno) && comprobarDiagonalUno.bind(this)()) return true;
        if (posicionEstaEnArray(posicion, diagonalDos) && comprobarDiagonalDos.bind(this)()) return true;

        return false;

        function comprobarDiagonalUno() {
            var diagonal = [this.rejilla[0][0], this.rejilla[1][1], this.rejilla[2][2]]
            return diagonal[0] === diagonal[1] && diagonal[0] === diagonal[2];
        }

        function comprobarDiagonalDos() {
            var diagonal = [this.rejilla[0][2], this.rejilla[1][1], this.rejilla[2][0]]
            return diagonal[0] === diagonal[1] && diagonal[0] === diagonal[2];
        }

        function posicionEstaEnArray(posicionMovimiento, arrayPosiciones) {
            //En cuanto la funcion de find devuelva "true", se acaba find y devuelve ese elemento
            //Compara la posicion (posicionMovimiento) con cada posicion de arrayPosiciones
            var encontrado = arrayPosiciones.find(posicion => posicionMovimiento[0] == posicion[0] && posicionMovimiento[1] === posicion[1]);
            return Boolean(encontrado);
        }
    }
    comprobarEmpate(){
        return this.movimientosDisponibles < 1;
    }


}

module.exports = Tablero;



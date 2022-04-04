var Jugador = require('./models/Jugador.js');
var salas = app.get('salas');

module.exports = function (io) {
    // WebSockets
    io.on('connection', function (socket) {
        console.log('Un usuario se ha conectado');
        socket.on('disconnect', function () {
            console.log('Un usuario se ha desconectado');
        });
        socket.on('nuevo-usuario', function (usuario) {
            console.log("Nombre recibido: ", usuario)
            var idSala = getSalaIdDesdeSocket(this)
            var sala = salas.buscarSalaId(idSala);
            sala.insertarJugador(new Jugador(usuario));

            socket.join(idSala, function () {
                console.log(socket.rooms);

                io.to(idSala).emit('lista usuarios', sala.jugadores);
            });
        })

        socket.on('estado listo', function (usuario) {
            var idSala = getSalaIdDesdeSocket(this)
            var sala = salas.buscarSalaId(idSala);
            var jugador = sala.encontrarJugador(usuario)
            if (jugador) jugador.listo = true;
            // Emitimos la lista de usuarios para que actualice los jugadores (su estado)
            io.to(idSala).emit('lista usuarios', sala.jugadores);
            // Emitimos si la partida esta lista
            if (sala.estaLista()) {
                io.to(idSala).emit('partida lista', sala.jugadores[0].nombre); // Siempre empieza el turno el jugador host ---- sala.jugadores[Math.round(Math.random())].nombre
                console.log("Partida lista")
            }
        })

        socket.on('movimiento', function (movimiento) {
            var idSala = getSalaIdDesdeSocket(this)
            var tablero = salas.buscarSalaId(idSala).tablero;
            var posicion = [movimiento[0], movimiento[1]];
            var nombreJugador = movimiento[2]
            tablero.marcar(posicion, nombreJugador)

            //Comprobamos si la partida ha acabado
            var victoria = tablero.comprobarVictoria(movimiento);
            if (victoria) {
                console.log("Fin del juego: ha ganado", movimiento[2])
                movimiento[3] = true; //movimiento.victoria = true
                salas.borrarSala(idSala);
                //io.to(idSala).emit('finJuego', movimiento);
            } else if (tablero.comprobarEmpate()) {
                movimiento[4] = true;//movimiento.empate = true
                salas.borrarSala(idSala);
            }

            // Emitimos a los usuarios el movimiento
            io.to(idSala).emit('movimiento', movimiento);
            console.log("Emite movimiento", idSala, movimiento)
        })


    });

    function getSalaIdDesdeSocket(socket) {
        var refererArr = socket.handshake.headers.referer.split("/"); // http://localhost:3000/sala/1
        return refererArr[refererArr.length - 1]; // Coge la id de la sala
    }
};
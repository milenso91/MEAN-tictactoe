import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class JuegoService {

    private url = 'http://localhost:3000';
    private socket;

    abrirSocket() {
        console.log("Socket abierto")
        this.socket = io();
    }

    enviaNombre(usuario) {
        this.socket.emit('nuevo-usuario', usuario);
    }

    marcarListo(usuario) {
        this.socket.emit('estado listo', usuario);
    }

    getUsuarios() {
        let observable = new Observable(observer => {
            this.socket.on('lista usuarios', (listaUsuarios) => {
                observer.next(listaUsuarios);
            });
        })
        return observable;
    }

    getMovimiento() {
        let observable = new Observable(observer => {
            this.socket.on('movimiento', (movimientoUsuario) => {
                observer.next(movimientoUsuario);
            });
        })
        return observable;
    }

    empiezaPartida() {
        let observable = new Observable(observer => {
            this.socket.on('partida lista', (turnoInicial) => {
                observer.next(turnoInicial);
                console.log("partida lista");
            });
        })
        return observable;
    }

    movimiento(i, j, usuario) {
        var movimiento = [i, j, usuario]
        this.socket.emit('movimiento', movimiento);
        console.log("Emitemovimiento??")
    }

    cerrarSocket() {
        this.socket.disconnect();
        console.log("Socket cerrado")
    }

}
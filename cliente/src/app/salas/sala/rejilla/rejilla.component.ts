import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { JuegoService } from '../juego.service';

@Component({
    selector: 'rejilla',
    templateUrl: './rejilla.component.html',
    styleUrls: ['./rejilla.component.css']
})
export class RejillaComponent implements OnInit {
    simboloJugador = "X";
    simboloRival = "O";
    @Input() rejilla: Array<Array<Number>>;
    @Input() miTurno: Boolean;
    @Input() nombreJugador: String;
    @Output() resultadoPartida = new EventEmitter<String>();
    @Output() autorMovimiento = new EventEmitter<String>();

    suscripcionMovimiento;

    constructor(private juegoService: JuegoService) { }

    ngOnInit() {
        this.suscripcionMovimiento = this.juegoService.getMovimiento().subscribe(movimiento => {
            console.log("Movimiento:", movimiento);
            this.marcarMovimiento(movimiento);
        })
    }

    jugar(i, j) {
        var casilla = this.rejilla[i][j];
        if (this.miTurno && !casilla) {
            this.miTurno = false;
            this.juegoService.movimiento(i, j, this.nombreJugador)
        }
    }

    marcarMovimiento(movimiento) {
        console.log("Marcando movimiento", movimiento)
        var fila = movimiento[0];
        var columna = movimiento[1];
        var autorMovimiento = movimiento[2];
        var victoria = movimiento[3];
        var empate = movimiento[4];

        var esMiMovimiento = this.nombreJugador == autorMovimiento;

        if(!victoria && !empate) this.autorMovimiento.emit(movimiento[2]);
        
        console.log("Emit autormovimiento", autorMovimiento);

        this.rejilla[fila][columna] = esMiMovimiento ? 1 : 2;

        if (victoria) {
            //mostrar a los usuarios quien ha ganado
            if (esMiMovimiento) this.resultadoPartida.emit("victoria");//console.log("HAS GANADO!!!")
            else this.resultadoPartida.emit("derrota");
        }
        else if (empate) {
            this.resultadoPartida.emit("empate");
        }
        else if (!esMiMovimiento) this.miTurno = true;
    }

    mostrarCelda(celda) {
        if (celda === 0) return "";
        else if (celda === 1) return this.simboloJugador;
        else if (celda === 2) return this.simboloRival;
    }

    ngOnDestroy() {
        this.suscripcionMovimiento.unsubscribe();
    }
}

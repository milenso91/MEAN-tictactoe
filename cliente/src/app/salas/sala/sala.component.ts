import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from './sala.service';
import { JuegoService } from './juego.service';

@Component({
    selector: 'app-sala',
    templateUrl: './sala.component.html',
    styleUrls: ['./sala.component.css']
})

export class SalaComponent implements OnInit, OnDestroy {
    id: Number;
    sala: Object;
    nombre: String;
    listaUsuarios; // Array de Objetos
    listo: Boolean = false;
    suscripciones;
    turno: Boolean = false;
    resultado: String;
    juegoEmpezado: Boolean = false;
    salaLlena: Boolean = false;
    autorMovimiento: String;

    constructor(private route: ActivatedRoute, private salaService: SalaService, private juegoService: JuegoService) { }

    ngOnInit() {
        this.juegoService.abrirSocket();
        // Coge el parametro id de la ruta.
        var suscripcionRoute = this.route.params.subscribe(params => {
            this.id = +params['id']; // + convierte id (string) a numero
        })
        var suscripcionSala = this.salaService.get(this.id).subscribe(sala => {
            console.log("la sala es:", sala);
            this.sala = sala;
        })
        var suscripcionJuego = this.juegoService.getUsuarios().subscribe(listaUsuarios => {
            console.log("la lista de usuarios:", listaUsuarios);
            this.listaUsuarios = listaUsuarios;
            var numeroJugadores = this.listaUsuarios.length;
            console.log("numero de jugadores:", numeroJugadores);
            if (numeroJugadores > 1) {
                this.salaLlena = true;
            }

        })

        var suscripcionPartida = this.juegoService.empiezaPartida().subscribe(turno => {
            this.juegoEmpezado = true;
            console.log("Turno de:", turno)
            if (this.nombre == turno) this.turno = true;
            this.mostrarTurno(this.listaUsuarios[0]);

        })

        this.suscripciones = [suscripcionRoute, suscripcionSala, suscripcionJuego, suscripcionPartida]
    }

    ponerNombre(nombre) {
        console.log("El nombre del jugador es:", nombre)
        this.nombre = nombre;
        this.juegoService.enviaNombre(nombre);
    }

    marcarListo() {
        this.juegoService.marcarListo(this.nombre);
        console.log("listo para jugar", this.nombre);
        this.listo = true;
    }

    mostrarTurno(turnoJugador) {
        var simbolo;

        if (this.listaUsuarios[0].nombre == turnoJugador) { 
        this.autorMovimiento = this.listaUsuarios[1].nombre;
        simbolo = !this.turno ? "(X)":"(O)";
        } else {
        this.autorMovimiento = this.listaUsuarios[0].nombre;
        simbolo = !this.turno ? "(O)":"(X)";
        }

        console.log(simbolo);
        this.autorMovimiento += simbolo;
    }

    mostrarResultadoPartida(resultado) {
        this.resultado = resultado;
    }

    ngOnDestroy() {
        if (this.suscripciones) {
            this.suscripciones.forEach(suscripcion => suscripcion.unsubscribe())
        }
        this.juegoService.cerrarSocket();
    }

}

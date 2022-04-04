import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalasService } from './salas.service';

@Component({
    selector: 'salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit, OnDestroy {
    constructor(private salasService: SalasService) { }

    salas;
    suscripcionSalas;

    ngOnInit() {
        this.getSalas();
    }

    getSalas() {
        this.suscripcionSalas = this.salasService.get()
            .subscribe(
            salas => this.salas = salas,
            error => console.error('Error cogiendo salas:', error),
            () => console.log(this.salas)
            );
    }

    estaLlena(numJugadores) {
        return numJugadores > 1
    }

    ngOnDestroy() {
        this.suscripcionSalas.unsubscribe();
    }
}

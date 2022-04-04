import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrearSalaService } from './crear-sala.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-crearsala',
    templateUrl: './crear-sala.component.html',
    styleUrls: ['./crear-sala.component.css']
})
export class CrearSalaComponent implements OnInit, OnDestroy {
    procesando: Boolean = false;
    id: number;
    creaSalaSuscripcion;

    constructor(private crearSalaService: CrearSalaService, private router: Router) { }

    ngOnInit() {
    }
    /*
     Al crear la sala se le envia el nombre,
     Se hace el post, y escucha la respuesta (subscribe)
     y redirige a la sala.
    */
    crearSala(nombre) {
        this.procesando = true;
        this.creaSalaSuscripcion = this.crearSalaService.post(nombre)
            .subscribe(
            id => {
                console.log("Sala creada:", id)
                this.id = id;
            },
            error => console.error('Error creando sala:', error),
            () => {
                console.log("Todo el POST acabado")
                this.router.navigateByUrl('/sala/' + this.id);
                this.procesando = false;
            }
            );
    }

    ngOnDestroy() {
        if (this.creaSalaSuscripcion) this.creaSalaSuscripcion.unsubscribe();
    }
}
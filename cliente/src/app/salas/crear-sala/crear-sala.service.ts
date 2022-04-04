import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrearSalaService {
    constructor(private http: Http) { }

    // Envia el nombre al servidor y hace el parse JSON de la sala.id
    post(nombre) {
        return this.http.post('api/sala', { nombre }) // equivale a nombre: nombre 
            .map(response => response.json());
    }
}
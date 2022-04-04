import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalaService {

    constructor(private http: Http) { }

    get(id) {

        return this.http.get('/api/sala/' + id).map(response => {
            console.log(response);
            return response.json();
        })
    }
}
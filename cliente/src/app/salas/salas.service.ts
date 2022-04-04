import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalasService {
    constructor(private http: Http) { }

    get() {
        return this.http.get('/api/sala').map(response => response.json());
    }
}
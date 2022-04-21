import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { grupoModel } from '../modelos/grupo';

const apiUrl = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class grupoService{
    constructor(private http: HttpClient) { }

    getGrupo(){
        return this.http.get<grupoModel[]>(`${apiUrl}grupos`)
    }
}
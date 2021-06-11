import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class TransformacionesService {

    constructor(private http: HttpClient) { }

    getTransformaciones() {
        return this.http.get(`${apiUrl}transformaciones?filter[where][estado]=true`)
    }

    postTransformaciones(transformaciones) {
        return this.http.post(`${apiUrl}transformaciones`, transformaciones);
    }

    putTransformaciones(id, transformaciones) {
        return this.http.put(`${apiUrl}transformaciones/${id}`, transformaciones);
    }

    deleteTransformaciones(id, transformaciones) {
        return this.http.patch(`${apiUrl}transformaciones/${id}`, transformaciones);
    }

}
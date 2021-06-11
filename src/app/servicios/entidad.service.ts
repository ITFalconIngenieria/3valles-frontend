import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class EntidadService {

    constructor(private http: HttpClient) { }

    getEntidad() {
        return this.http.get(`${apiUrl}entidads?filter[where][estado]=true`)
    }

    postEntidad(entidad) {
        return this.http.post(`${apiUrl}entidads`, entidad);
    }

    putEntidad(id, entidad) {
        return this.http.put(`${apiUrl}entidads/${id}`, entidad);
    }

    deleteEntidad(id, entidad) {
        return this.http.patch(`${apiUrl}entidads/${id}`, entidad);
    }

    // medidoresEntidad

    getMedidorEntidad(id) {
        return this.http.get(`${apiUrl}medidor-entidads?filter[where][and][0][estado]=true&filter[where][and][1][id]=${id}`)
    }

    postMedidorEntidad(medidorEntidad) {
        return this.http.post(`${apiUrl}medidor-entidads`, medidorEntidad);
    }

    putMedidorEntidad(id, medidorEntidad) {
        return this.http.put(`${apiUrl}medidor-entidads/${id}`, medidorEntidad);
    }

    deleteMedidorEntidad(id, medidorEntidad) {
        return this.http.patch(`${apiUrl}medidor-entidads/${id}`, medidorEntidad);
    }
}
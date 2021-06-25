import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class MedidorService {

    constructor(
        private http: HttpClient
    ) { }

    // Medidores

    getMedidor() {
        return this.http.get(`${apiUrl}medidors`);
    }

    getvMedidor() {
        return this.http.get(`${apiUrl}v-medidor-variables`);
    }

    postMedidor(medidor) {
        return this.http.post(`${apiUrl}medidors`, medidor);
    }

    putMedidor(id, medidor) {
        return this.http.put(`${apiUrl}medidors/${id}`, medidor);
    }

    deleteMedidor(id, medidor) {
        return this.http.patch(`${apiUrl}medidors/${id}`, medidor);
    }

    // Rollover
    getRollover() {
        return this.http.get(`${apiUrl}roll-overs?filter[where][estado]=true`);
    }

    getRolloverMedidor(id) {
        return this.http.get(`${apiUrl} roll-overs?filter[where][medidorId]=${id}`);
    }

    postRollover(rollover) {
        return this.http.post(`${apiUrl}roll-overs`, rollover);
    }

    putRollover(id, rollover) {
        return this.http.put(`${apiUrl}roll-overs/${id}`, rollover);
    }

    deleteRollover(id, rollover) {
        return this.http.patch(`${apiUrl}roll-overs/${id}`, rollover);
    }

    // Vista a PME
    getMedidorPME() {
        return this.http.get(`${apiUrl}v-medidor-pmes`);
    }
}
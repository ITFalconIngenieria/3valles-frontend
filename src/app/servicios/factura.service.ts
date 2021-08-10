import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getDetalle() {
      return this.http.get(`${apiUrl}factura-datos/65?fechai=2021-07-01T00%3A00%3A00.000Z&fechaf=2021-08-01T00%3A00%3A00.000Z`)
  }

}

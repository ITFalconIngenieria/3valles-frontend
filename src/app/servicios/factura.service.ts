import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

/*  getDetalle(fechai:string,fechaf:string,medidor:number) {
      return this.http.get(`${apiUrl}factura-datos/${medidor}?fechai=${fechai}&fechaf=${fechaf}`)
  }
*/

getConsumoMedidores(cc:number,f1:string,f2:string) {
  return this.http.get(`${apiUrl}consumo-medidores?cc=${cc}&f1=${f1}&f2=${f2}`)
}

getFactores(grupo:number){
  return this.http.get(`${apiUrl}factores-factura?grupo=${grupo}`)
}

  getResumen(fechai:string,fechaf:string){
      return this.http.get(`${apiUrl}resumen-datos?fechai=${fechai}&fechaf=${fechaf}`)
 //  return this.http.get(`${apiUrl}resumen-datos?fechai=20210201&fechaf=20210301`)
  }

}

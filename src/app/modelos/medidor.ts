export interface Medidor{
    id:number;
    codigo: string;
    lecturaMax: any;
    multiplicador: any;
    observacion: string;
    estado: boolean;
}

export interface Rollover {
    id: number;
    medidorId: number;
    fecha: string;
    energia:number;
    lecturaAnterior: any;
    lecturaNueva: any;
    observacion: string;
    estado: boolean;
  }
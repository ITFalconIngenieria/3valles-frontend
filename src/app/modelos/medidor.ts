export interface MedidorModel{
    id:number;
    codigo: string;
    lecturaMax: any;
    multiplicador: any;
    observacion: string;
    estado: boolean;
}

export interface RolloverModel{
    id: number;
    medidorId: number;
    fecha: string;
    energia:number;
    lecturaAnterior: any;
    lecturaNueva: any;
    observacion: string;
    estado: boolean;
  }
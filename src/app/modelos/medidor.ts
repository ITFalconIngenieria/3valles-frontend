export interface MedidorModel{
    id:number;
    codigo: string;
    variableId: number;
    lecturaMax: any;
    multiplicador: any;
    observacion: string;
    estado: boolean;
}

export interface vMedidorModel{
    id:number;
    codigo: string;
    variableId: number;
    lecturaMax: any;
    multiplicador: any;
    observacion: string;
    estado: boolean;
    variable:string;
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
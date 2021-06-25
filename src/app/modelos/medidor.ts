import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
}

export interface MedidorModel{
    id:number;
    sourceId: number;
    descripcion: string;
    lecturaMax: any;
    multiplicador: any;
    observacion: string;
    tipo: boolean;
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

  export interface PMEMedidorModel{
    id: number;
    descripcion: string;
  }
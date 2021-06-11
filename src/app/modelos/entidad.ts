export interface Entidad {
    id: number;
    codigo: string;
    descripcion: string;
    tipo: boolean;
    entidad: number;
    observacion: string;
    estado: boolean;
}

export interface MedidorEntidad {
    id: number;
    medidorId: number;
    entidadId: number;
    fechaInicial: string;
    fechaFinal: string;
    jerarquiaId: number;
    observacion: string;
    estado: boolean;
}
export interface JerarquiaModel {
    id: number;
    descripcion: string;
    dependenciaId: number;
    estado: boolean;
}

export interface vJerarquiaModel{
    id: number;
    descripcion: string;
    dependenciaId: number;
    estado: boolean;
    herencia: string;
}
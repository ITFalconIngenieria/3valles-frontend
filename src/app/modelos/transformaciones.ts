export interface Transformaciones {
    id: number;
    clienteId: number;
    proveedorId: number;
    transformadorId: number;
    numeroTransf: number;
    fechaInicial?: string;
    fechaFinal?: string;
    observacion?: string;
    estado?: boolean;
}
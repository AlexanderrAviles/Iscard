export interface Usuario {
  id: string;
  createdTime: string;
  fields: {
    tipo: string;
    activo: boolean;
    usuario: string;
    contrasena: string;
    nombre: string;
    id: number;
    establecimiento: string[];
    establecimiento_nombre: string,
    fecha_creacion: string;
    fecha_modificacion: string;
  };
}


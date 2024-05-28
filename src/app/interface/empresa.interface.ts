export interface EmpresaRecord {
  id: number;
  activo: boolean;
  nombre: string;
  logo: string;
  time:number;
}
export interface Empresa {
  id: number;
  activo: boolean;
  nombre: string;
  logo: string;
  banner: string;
  regiones: string[];
  rubro: string;
  url?: string;
}

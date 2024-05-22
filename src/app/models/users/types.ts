import { TypeAccount } from "@/app/molecule/typeAccount/types";

export interface DtoUser {
  id: number;
  telefono: string;
  correo: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  contrasena_hash?: string;
  contrasena_hash_temporal?: string;
  tipoDeCuenta: TypeAccount;
  fotoPerfil: string;
  cuentaDesactivada: number;
}

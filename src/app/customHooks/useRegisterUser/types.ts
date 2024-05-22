type TypeAccount = 'administrador'|'usuario'|'superAdministrador';

export interface DtoRegisterUser {
  correo: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  contrasena: string;
  telefono: string;
  tipoDeCuenta:TypeAccount;
}

export interface DtoLoginUser {
  correo: string;
  contrasena: string;
  tipoDeCuenta:TypeAccount;
}

export interface StateUseRegisterUser {
  isRegistering: boolean;
  profilePicture: File | null;
}

export interface ReturnUseRegisterUser extends StateUseRegisterUser {
  setProfilePicture: (pictures: File | null) => void;
  attemptRegisterUser: (data: DtoRegisterUser) => Promise<void>;
}

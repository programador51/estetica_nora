export interface DtoRegisterUser {
  correo: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  contrasena: string;
  telefono: string;
}

export interface DtoLoginUser {
  correo: string;
  contrasena: string;
}

export interface StateUseRegisterUser {
  isRegistering: boolean;
  profilePicture: File | null;
}

export interface ReturnUseRegisterUser extends StateUseRegisterUser {
  setProfilePicture: (pictures: File | null) => void;
  attemptRegisterUser: (data: DtoRegisterUser) => Promise<void>;
}

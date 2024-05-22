export type TypeAccount = 'administrador'|'usuario'|'superAdministrador';

export interface PropsTypeAccount {
  onChange?: (type: TypeAccount) => void;
  value?:TypeAccount;
}

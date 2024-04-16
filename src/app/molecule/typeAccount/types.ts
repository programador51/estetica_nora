export type TypeAccount = "admin" | "user";

export interface PropsTypeAccount {
  onChange?: (type: TypeAccount) => void;
  value?:TypeAccount;
}

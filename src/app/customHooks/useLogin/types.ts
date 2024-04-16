import { TypeAccount } from "@/app/molecule/typeAccount/types";

export interface StateUseLogin {
  type: TypeAccount;
  isLoging: boolean;
}

export interface ReturnUseLogin extends StateUseLogin {
  setTypeAccount: (type: TypeAccount) => void;
}

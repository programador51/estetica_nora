import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { DtoLoginUser } from "@/app/customHooks/useRegisterUser/types";

export interface StateUseLogin {
  type: TypeAccount;
  isLoging: boolean;
}

export interface ReturnUseLogin extends StateUseLogin {
  setTypeAccount: (type: TypeAccount) => void;
  attemptLoginUser: (dto: DtoLoginUser) => Promise<void>;
}

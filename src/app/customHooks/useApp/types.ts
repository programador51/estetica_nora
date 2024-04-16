import { TypeAccount } from "@/app/molecule/typeAccount/types";

export interface StateUseApp {
  isLoading: boolean;
  profile: {
    fullName: string;
    phone: string;
    email: string;
    type: TypeAccount;
    picture: string;
  };
}

export interface ReturnUseApp extends StateUseApp{

}
import { UseFormReturn } from "react-hook-form";
import { DtoLoginUser, DtoRegisterUser } from "../useRegisterUser/types";

export interface ReturnUseFormUsers {
  form: UseFormReturn<DtoRegisterUser | DtoLoginUser, any, undefined>|undefined;
}

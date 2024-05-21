import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { DtoLoginUser } from "@/app/customHooks/useRegisterUser/types";

export type TypeFormUser = "register" | "login";

export interface PropsFormUsers
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  type: TypeFormUser;
  children?: JSX.Element | JSX.Element[];
  onSubmitedForm?: (data:DtoLoginUser|DtoRegisterUser) => void;
}

export interface PropsInputProfilePic {
  id?: number;
  onChange?: (picture: File | null) => void;
}

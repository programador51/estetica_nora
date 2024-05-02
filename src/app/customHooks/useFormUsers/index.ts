import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DtoLoginUser, DtoRegisterUser } from "../useRegisterUser/types";
import {
  schemaLoginUsers,
  schemaRegisterUsers,
} from "@/app/helpers/validations/users";
import { TypeFormUser } from "@/app/structure/Forms/users/types";
import { ReturnUseFormUsers } from "./types";

export default function useFormUsers(type: TypeFormUser): ReturnUseFormUsers {
  const schemaToUse =
    type === "register" ? schemaRegisterUsers : schemaLoginUsers;

  const form = useForm<DtoRegisterUser | DtoLoginUser>({
    resolver: yupResolver(schemaToUse),
    mode: "onChange",
  });

  return {
    form,
  };
}

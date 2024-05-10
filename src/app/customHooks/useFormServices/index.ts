import { FormServiceType } from "@/app/structure/Forms/services/types";
import { schemaAddService } from "@/app/helpers/validations/services";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddService, ReturnUseFormServices } from "./types";

export default function useFormServices(
  type: FormServiceType,
  id?: number,
  onLoadedService?: () => void
): ReturnUseFormServices {
  const schemaToUse = type === "add" ? schemaAddService : schemaAddService;

  const [state, setState] = useState({
    isLoading: false,
  });

  const form = useForm<AddService>({
    resolver: yupResolver(schemaToUse),
    mode: "all",
    shouldFocusError: true,
  });

  return {
    ...state,
    form,
  };
}

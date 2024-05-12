import { useEffect, useState } from "react";
import { StateUseService } from "./types";
import { AddService } from "../useFormServices/types";
import { FormServiceType } from "@/app/structure/Forms/services/types";
import { sendDtoToApi } from "@/app/helpers/api/v1/services";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StateUseService = {
  isLoading: true,
  dto: undefined,
  files: [],
  filesLoadedFromApi: false,
  initialPicturesUrls: [],
  isUpdating: false,
};

export default function useService(type: FormServiceType) {
  const [state, setState] = useState(INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (state.dto !== undefined && type === "add") {
        setState((current) => ({
          ...current,
          isUpdating: true,
        }));

        const wasAdded = await sendDtoToApi(state.dto, state.files);

        setState((current) => ({
          ...current,
          isUpdating: false,
        }));

        if (wasAdded) router.push("/app/servicios");
      }
    })();
  }, [state.dto]);

  const setCurrentFiles = (files: File[]) =>
    setState((current) => ({
      ...current,
      files,
    }));

  const setDto = (dto: undefined | AddService) =>
    setState((current) => ({
      ...current,
      dto,
    }));

  return {
    ...state,
    setCurrentFiles,
    setDto,
  };
}

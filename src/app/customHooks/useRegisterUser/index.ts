import { useState } from "react";
import {
  DtoRegisterUser,
  ReturnUseRegisterUser,
  StateUseRegisterUser,
} from "./types";
import { addUser } from "@/app/helpers/api/v1/users";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StateUseRegisterUser = {
  isRegistering: false,
  profilePicture: null,
};

export default function useRegisterUser(): ReturnUseRegisterUser {
  const [state, setState] = useState(INITIAL_STATE);

  const router = useRouter();

  const setProfilePicture = (picture: File | null) =>
    setState((current) => ({
      ...current,
      profilePicture: picture,
    }));

  const attemptRegisterUser = async (data: DtoRegisterUser) => {
    setState((current) => ({
      ...current,
      isRegistering: true,
    }));

    const wasAdded = await addUser(data, state.profilePicture);

    if (wasAdded) {
      router.push("/app/citas");
    }

    setState((current) => ({
      ...current,
      isRegistering: false,
    }));
  };

  return {
    ...state,
    setProfilePicture,
    attemptRegisterUser,
  };
}

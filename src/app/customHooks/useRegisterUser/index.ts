import { useState } from "react";
import {
  DtoRegisterUser,
  ReturnUseRegisterUser,
  StateUseRegisterUser,
} from "./types";
import { addUser } from "@/app/helpers/api/v1/users";

const INITIAL_STATE: StateUseRegisterUser = {
  isRegistering: false,
  profilePicture: null,
};

export default function useRegisterUser(): ReturnUseRegisterUser {
  const [state, setState] = useState(INITIAL_STATE);

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
      window.location.href = `${window.location.origin}/app/citas`;
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

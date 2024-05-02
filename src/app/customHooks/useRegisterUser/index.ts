import { useState } from "react";
import { ReturnUseRegisterUser, StateUseRegisterUser } from "./types";

const INITIAL_STATE: StateUseRegisterUser = {
  isRegistering: false,
  profilePicture: null,
};

export default function useRegisterUser():ReturnUseRegisterUser {
  const [state, setState] = useState(INITIAL_STATE);

  const setProfilePicture = (picture: File|null) =>
    setState((current) => ({
      ...current,
      profilePicture:picture
    }));

  return {
    ...state,
    setProfilePicture
  };
}

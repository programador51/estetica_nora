import { useEffect, useState } from "react";
import { ReturnUseConfigureItem, StateUseAuthentication } from "./types";
import { fetchUsers } from "@/app/helpers/api/v1/users";

const INITIAL_STATE: StateUseAuthentication = {
  page: 1,
  isLoading: true,
  authentication: [],
};

export default function useAuthentication(): ReturnUseConfigureItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      setState((current) => ({
        ...current,
        isLoading: true,
      }));

      const accounts = await fetchUsers();

      setState((current) => ({
        ...current,
        isLoading: false,
        authentication: accounts.map((item) => ({
          authentication: item.type,
          id: item.id,
          name: item.name,
          urlPicture: item.profilePicture,
        })),
      }));
    })();
  }, [state.page]);

  return {
    ...state,
  };
}

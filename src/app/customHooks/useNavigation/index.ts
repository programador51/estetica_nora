import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ReturnUseNavigation, StateNavigation } from "./types";
import ui from "@/app/molecule/navigation/menu/styles.module.scss";

export const INITIAL_STATE = {
  displayGuestProfile: true,
  displayMenu: false,
  menu: null,
};

export const METHODS = {
  toggleMenu: () => {},
};

export default function useNavigation(): ReturnUseNavigation {
  const [state, setState] = useState<StateNavigation>({
    displayGuestProfile: true,
    displayMenu: false,
  });

  const menu: MutableRefObject<HTMLDivElement | null> | null =
    useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (state.displayMenu) {
      menu.current?.classList.add(ui.menuOpened);
    } else {
      menu.current?.classList.remove(ui.menuOpened);
    }
  }, [state.displayMenu]);

  const toggleMenu = () => {
    setState((current) => ({
      ...current,
      displayMenu: !current.displayMenu,
    }));
  };

  return {
    menu,
    ...state,
    toggleMenu,
  };
}

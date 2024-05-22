import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ReturnUseNavigation, StateNavigation } from "./types";
import ui from "@/app/molecule/navigation/menu/styles.module.scss";
import useApp from "../useApp";

export const INITIAL_STATE = {
  displayGuestProfile: true,
  displayMenu: false,
  menu: null,
  firstRender: true,
};

export const METHODS = {
  toggleMenu: () => {},
};

export default function useNavigation(): ReturnUseNavigation {
  const [state, setState] = useState<StateNavigation>({
    displayGuestProfile: true,
    displayMenu: false,
    firstRender: true,
  });

  const app = useApp();

  const menu: MutableRefObject<HTMLDivElement | null> | null =
    useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (state.displayMenu) {
      menu.current?.classList.add(ui.menuOpened);
      menu.current?.classList.remove(ui.menuClosed);
    }

    if (!state.displayMenu && !state.firstRender) {
      menu.current?.classList.add(ui.menuClosed);
      menu.current?.classList.remove(ui.menuOpened);
    }

    setState((current) => ({
      ...current,
      firstRender: false,
    }));
  }, [state.displayMenu]);

  const toggleMenu = () => {
    setState((current) => ({
      ...current,
      displayMenu: !current.displayMenu,
    }));
  };
  useEffect(() => {
    if (menu.current === null) return;

    const links = menu.current.querySelectorAll("a");

    links.forEach((link) => link.addEventListener("click", toggleMenu));
  }, []);

  return {
    menu,
    ...state,
    toggleMenu,
    app
  };
}

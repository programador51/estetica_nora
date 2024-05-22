import { MutableRefObject } from "react";
import { ReturnUseApp } from "../useApp/types";

export interface StateNavigation {
  displayGuestProfile: boolean;
  displayMenu: boolean;
  firstRender:boolean;
}

export interface ReturnUseNavigation extends StateNavigation {
  menu: MutableRefObject<HTMLDivElement | null> | null;
  toggleMenu: () => void;
  app:ReturnUseApp;
}

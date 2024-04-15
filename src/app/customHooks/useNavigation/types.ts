import { MutableRefObject } from "react";

export interface StateNavigation {
  displayGuestProfile: boolean;
  displayMenu: boolean;
}

export interface ReturnUseNavigation extends StateNavigation {
  menu: MutableRefObject<HTMLDivElement | null> | null;
  toggleMenu: () => void;
}

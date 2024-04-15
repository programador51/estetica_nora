"use client";
import React, { createContext } from "react";
import ui from "./styles.module.scss";
import Link from "next/link";
import Menu from "@/app/molecule/navigation/menu";
import useNavigation, {
  INITIAL_STATE,
  METHODS,
} from "@/app/customHooks/useNavigation";
import { ReturnUseNavigation } from "@/app/customHooks/useNavigation/types";

export const ContextNavigation = createContext<ReturnUseNavigation>({
  ...INITIAL_STATE,
  ...METHODS,
});

export default function Navigation() {
  const hook = useNavigation();

  return (
    <ContextNavigation.Provider value={hook}>
      <Menu />
      <nav className={ui.nav}>
        <Link href={"/"}>
          <img src="/logo.png" alt="estética_nora_logo" />
          <div>
            <p>Estética Nora</p>
            <p>Unisex</p>
          </div>
        </Link>

        <button onClick={hook.toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </ContextNavigation.Provider>
  );
}

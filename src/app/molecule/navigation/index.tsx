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
import BurguerButton from "@/app/molecule/navigation/burguerButton";
import HandledImage from "@/app/atom/image";

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
          <HandledImage src="/logo.png" alt="estética_nora_logo" />

          <div>
            <p>Estética Nora</p>
            <p>Unisex</p>
          </div>
        </Link>

        <button onClick={hook.toggleMenu}>
          <BurguerButton />
        </button>
      </nav>
    </ContextNavigation.Provider>
  );
}

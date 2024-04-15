import React, { useContext } from "react";
import ui from "./styles.module.scss";
import MenuItem from "@/app/atom/menuItem";
import Account from "@/app/molecule/account";
import { ContextNavigation } from "..";

export default function Menu() {
  const hook = useContext(ContextNavigation);

  return (
    <div className={ui.menu} ref={hook.menu}>
      <Account />

      <div className={ui.menuItems}>
        <MenuItem link={"/"}>Inicio</MenuItem>
        <MenuItem link={"/citas"}>Citas</MenuItem>
        <MenuItem link={"/#catalogo"}>Catálogo</MenuItem>
        <MenuItem link={"/#servicios"}>Servicios</MenuItem>
        <MenuItem link={"/#horario"}>Horario estética</MenuItem>
      </div>
    </div>
  );
}

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
        <MenuItem link={"/app/citas"}>Citas</MenuItem>
        <MenuItem link={"/app/catalogo"}>Catálogo</MenuItem>
        <MenuItem link={"/app/servicios"}>Servicios</MenuItem>
        <MenuItem link={"/app/horarios"}>Horario </MenuItem>
        <MenuItem link={"/app/diasferiados"}>Dias Feriados </MenuItem>
        <MenuItem link={"/app/cuentas"}>Cuentas </MenuItem>
      </div>
    </div>
  );
}

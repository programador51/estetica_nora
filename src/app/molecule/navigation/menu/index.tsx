import React, { Fragment, useContext } from "react";
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

        {hook.app.profile === undefined ? null : (
          <MenuItem link={"/app/citas"}>Citas</MenuItem>
        )}

        {hook.app.profile === undefined ||
        hook.app.profile.type === "usuario" ? null : (
          <Fragment>
            <MenuItem link={"/app/catalogo"}>Catálogo</MenuItem>
            <MenuItem link={"/app/servicios"}>Servicios</MenuItem>
            <MenuItem link={"/app/horarios"}>Horario</MenuItem>

            {hook.app.profile.type === "superAdministrador" && (
              <MenuItem link={"/app/cuentas"}>Cuentas</MenuItem>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

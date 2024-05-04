import React, { useContext, useRef } from "react";
import Spinner from "@/app/molecule/Spinner";
import { v4 } from "uuid";
import ui from "../styles.module.scss";
import ConfigureItem from "@/app/molecule/configureitem";//
//import { ContextReservations } from "@/app/Contexts/ReservationsContext";
import { ContextAuthentication } from "@/app/Contexts/AuthenticationContext";
export default function AccessCards() {
  const hook = useContext(ContextAuthentication);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando cuentas" />;

  return (
    <div className={ui.items}>
      {hook.authentication?.map((item, i) => ( // <- Usando el operador de encadenamiento opcional
        <ConfigureItem
          key={`${key.current}-${i}`}
          name={item.name}
          authentication={item.authentication}
          urlPicture={item.urlPicture}
        />
      ))}
    </div>
  );
}
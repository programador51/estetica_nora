"use client";
import useAuthentication from "@/app/customHooks/useAuthentication"; //agrego
import React from "react";
import ui from "./styles.module.scss";
import AccessCards from "./AccessCards";
import { ContextAuthentication } from "@/app/Contexts/AuthenticationContext"; //

export default function Access() {
  const hook = useAuthentication();

  return (
    <ContextAuthentication.Provider value={hook}>
      <div className={ui.container}>
        <div className={ui.header}>
          <h1>Cuentas</h1>
        </div>

        <AccessCards />
      </div>
    </ContextAuthentication.Provider>
  );
}

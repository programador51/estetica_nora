"use client";
import useAuthentication from "@/app/customHooks/useAuthentication";//agrego
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import AccessCards from "./AccessCards";
import Link from "next/link";
import { ContextAuthentication } from "@/app/Contexts/AuthenticationContext";//

export default function Access() {
  const hook = useAuthentication();

  return (
    <ContextAuthentication.Provider value={hook}>
      <div className={ui.header}>
        <h1>Cuentas</h1>
        <Link href={'/app/cuentas/agregar'}>
        <Button>Acceder</Button>
        </Link>
      </div>

      <AccessCards />
    </ContextAuthentication.Provider>
  );
}

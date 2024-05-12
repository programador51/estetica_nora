"use client";
import ServiceContext from "@/app/Contexts/ServicesContext";
import useServices from "@/app/customHooks/useServices";
import React from "react";
import ServicesList from "./servicesList";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import Pagination from "@/app/molecule/pagination";
import Link from "next/link";

export default function Services() {
  const hook = useServices();

  return (
    <ServiceContext.Provider value={hook}>
      <div className={ui.services}>
        <h1>Servicios</h1>
        <Link href={"/app/servicios/agregar"}>
          <Button>Agregar servicio</Button>
        </Link>

        <ServicesList />

        <Pagination page={hook.page} pages={hook.pages} />
      </div>
    </ServiceContext.Provider>
  );
}

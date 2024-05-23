"use client";
import ServiceContext from "@/app/Contexts/ServicesContext";
import Spinner from "@/app/molecule/Spinner";
import ServiceItem from "@/app/molecule/serviceItem";
import React, { useContext, useRef } from "react";
import { v4 } from "uuid";

export default function ServicesList() {
  const hook = useContext(ServiceContext);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando servicios" />;

  if (hook.services.length <= 0) return <></>;

  return hook.services.map((service, i) => (
    <ServiceItem
      costPrice={+service.costo}
      durationOnMinutes={service.duracionEnMinutos}
      id={service.id}
      key={`${key.current}-${i}`}
      name={service.titulo}
      picture={service.imagen[0]}
      imagen={service.imagen}
      sellPrice={+service.venta}
      susceptibleToChange={service.suceptibleEnCambios}
      toleranceOnMinutes={service.toleranciaEnMinutos}
      renderView={true}
    />
  ));
}

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
    <ServiceItem {...service} key={`${key.current}-${i}`} renderView={true}/>
  ));
}

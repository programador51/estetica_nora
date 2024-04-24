import ContextReservation from "@/app/Contexts/ReservationContext";
import ServiceItem from "@/app/molecule/serviceItem";
import React, { useContext, useRef } from "react";
import { v4 } from "uuid";

export default function Services() {
  const hook = useContext(ContextReservation);

  const key = useRef(v4());

  if (hook.services.length <= 0) return <></>;

  return hook.services.map((service, i) => (
    <ServiceItem
      {...service}
      key={`${key.current}-${i}`}
      renderDelete={true}
      renderView={false}
      onDeleteConfirmed={() => hook.deleteService(i)}
    />
  ));
}

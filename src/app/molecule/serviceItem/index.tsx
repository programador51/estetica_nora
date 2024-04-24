import Button from "@/app/atom/button";
import React, { useState } from "react";
import Money from "@/app/atom/money";
import ui from "./styles.module.scss";
import { PropsServiceItem } from "./types";
import Time from "@/app/atom/time";
import { promptConfirmation } from "@/app/helpers/alerts";

export default function ServiceItem(service: PropsServiceItem) {
  const [img, setImg] = useState(service.picture);

  const { onDeleteConfirmed = () => {} } = service;

  const handleDelete = async () => {
    const { isConfirmed } = await promptConfirmation({
      title: "¿Deseas borrar el servicio?",
      text: "Si guardas los cambios la cita estara sujeto a disponibilidad si deseas re-agendar",
    });

    if (isConfirmed) onDeleteConfirmed();
  };

  return (
    <article className={ui.containerServiceItem}>
      <div className={ui.overviewService}>
        <img
          src={img}
          alt={`imagen_servicio_${service.name}`}
          onError={() => setImg("/no_image.png")}
        />
        <div className={ui.serviceInfo}>
          <b>{service.name}</b>
          <div>
            <Time>{service.durationOnMinutes}</Time>
            <Money>{service.sellPrice}</Money>
          </div>
        </div>
      </div>
      <Button onClick={handleDelete} theme="danger">
        Borrar
      </Button>
    </article>
  );
}

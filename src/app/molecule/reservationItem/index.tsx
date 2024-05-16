import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useReservation from "@/app/customHooks/useReservation";
import HandledImage from "@/app/atom/image";

export default function ReservationItem({
  name,
  reservation,
  urlPicture = null,
}: TypeReservationItem) {
  return (
    <div className={ui.itemCard}>
      <div>
        <HandledImage src={urlPicture} alt={`foto_de_perfil_${name}`} />

        <div>
          <b>
            <p>{name}</p>
          </b>
          <p>
            {new Intl.DateTimeFormat("es", {
              dateStyle: "long",
            }).format(reservation)}
          </p>
          <p>
            {new Intl.DateTimeFormat("es", {
              timeStyle: "medium",
              hour12: true,
            }).format(reservation)}
          </p>
        </div>
      </div>

      <div>
        {/* <Button theme="danger" onClick={hook.promptCancelation}>
          Cancelar reservación
        </Button> */}
        <Button theme="secondary">Ver detalle</Button>
      </div>
    </div>
  );
}

import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useReservation from "@/app/customHooks/useReservation";

export default function ReservationItem({
  name,
  reservation,
  urlPicture = null,
}: TypeReservationItem) {
  const hook = useReservation(1);
  return (
    <div className={ui.itemCard}>
      <div>
        <img
          src={
            typeof urlPicture === "string"
              ? urlPicture
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={`foto_de_perfil_${name}`}
        />

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
        <Button theme="danger" onClick={hook.promptCancelation}>
          Cancelar reservación
        </Button>
        <Button theme="secondary">Ver detalle</Button>
      </div>
    </div>
  );
}

import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import HandledImage from "@/app/atom/image";
import useReservationCard from "@/app/customHooks/useReservationCard";
import uiSpinner from "@/app/molecule/Spinner/styles.module.scss";

export default function ReservationItem({
  name,
  reservation,
  urlPicture = null,
  id
}: TypeReservationItem) {
  const hook = useReservationCard(id);

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
        <Button
          theme="danger"
          onClick={hook.promptCancellation}
          disabled={hook.isCancelling}
        >
          {hook.isCancelling ? (
            <span className={uiSpinner.loadingText}>Cancelando</span>
          ) : (
            "Cancelar reservación"
          )}
        </Button>
        <Button theme="secondary">Ver detalle</Button>
      </div>
    </div>
  );
}

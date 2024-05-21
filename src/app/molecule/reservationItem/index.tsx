import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import HandledImage from "@/app/atom/image";
import useReservationCard from "@/app/customHooks/useReservationCard";
import ContextReservationCard from "@/app/Contexts/ReservationCardContext";
import CancelationButton from "./CancelationButton";
import StatusLabel from "./StatusLabel";

export default function ReservationItem(props: TypeReservationItem) {
  const {
    name,
    reservation,
    urlPicture = null,
    id,
    onCancelated = () => {},
  } = props;

  const hook = useReservationCard(id, onCancelated);

  return (
    <ContextReservationCard.Provider value={{ ...props, ...hook }}>
      <div className={ui.itemCard}>
        <div>
          <HandledImage src={urlPicture} alt={`foto_de_perfil_${name}`} />

          <div className={ui.overviewReservation}>
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

            <StatusLabel />
          </div>
        </div>

        <div>
          <CancelationButton />
          <Button theme="secondary">Ver detalle</Button>
        </div>
      </div>
    </ContextReservationCard.Provider>
  );
}

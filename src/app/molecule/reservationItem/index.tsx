import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import HandledImage from "@/app/atom/image";
import useReservationCard from "@/app/customHooks/useReservationCard";
import ContextReservationCard from "@/app/Contexts/ReservationCardContext";
import CancelationButton from "./CancelationButton";
import StatusLabel from "./StatusLabel";
import ReservationOverviewModal from "@/app/structure/ReservationOverviewModal";

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
              {new Intl.DateTimeFormat("es-MX", {
                dateStyle: "long",
              }).format(reservation)}
            </p>
            <p>
              {new Intl.DateTimeFormat("es-MX", {
                timeStyle: "medium",
                hour12: true,
              }).format(reservation)}
            </p>

            <StatusLabel />
          </div>
        </div>

        <div className={ui.options}>
          <CancelationButton />
          <ReservationOverviewModal id={id}>
            <Button theme="secondary">Ver detalle</Button>
          </ReservationOverviewModal>
        </div>
      </div>
    </ContextReservationCard.Provider>
  );
}

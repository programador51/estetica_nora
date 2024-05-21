import ContextReservationCard from "@/app/Contexts/ReservationCardContext";
import { ReservationStatus } from "@/app/models/reservations/types";
import React, { useContext } from "react";
import ui from '../styles.module.scss';

type IndexedLabelsI = {
  [key in ReservationStatus]: string;
};

const INDEXED_LABELS: IndexedLabelsI = {
  cancelado: "Cancelado",
  reservado: "Reservado",
  terminado: "Terminado",
};

const INDEXED_STYLES = {
    cancelado:ui.cancelado,
    reservado:ui.reservado,
    terminado:ui.terminado,
}

export default function StatusLabel() {
  const hook = useContext(ContextReservationCard);

  return <p className={INDEXED_STYLES[hook.estatus]}>{INDEXED_LABELS[hook.estatus]}</p>;
}

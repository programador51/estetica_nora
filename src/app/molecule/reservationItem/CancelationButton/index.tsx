import React, { useContext } from "react";
import Button from "@/app/atom/button";
import ContextReservationCard from "@/app/Contexts/ReservationCardContext";
import uiSpinner from "@/app/molecule/Spinner/styles.module.scss";

export default function CancelationButton() {
  const hook = useContext(ContextReservationCard);

  if (hook.estatus === "cancelado") return <></>;

  return (
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
  );
}

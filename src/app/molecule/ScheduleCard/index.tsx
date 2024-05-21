import ui from "@/app/app/horarios/agregar/styles.module.scss";
import React, { useState } from "react";
import { DayName, TimeTablesItem } from "./types";
import Button from "@/app/atom/button";
import { promptConfirmation } from "@/app/helpers/alerts";
import { secondsToTime } from "@/app/helpers/dates";
import { deleteSchedule } from "@/app/helpers/api/v1/schedule";

const NAME_DATE: DayName = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export default function Schedule({
  day,
  endTime,
  startTime,
  id,
  onDeleted = () => {},
}: TimeTablesItem) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnDelete = async () => {
    const { isConfirmed } = await promptConfirmation({
      title: "Borrar horario",
      text: "Estas seguro, esta acción no se puede des-hacer",
    });

    setIsDeleting(true);

    if (isConfirmed && typeof id !== "number") {
      onDeleted();
      setIsDeleting(false);
      return;
    }

    if (isConfirmed && typeof id === "number") {
      const wasDeleted = await deleteSchedule(id);

      if (wasDeleted) onDeleted();

      setIsDeleting(false);
    }
  };

  return (
    <div className={ui.itemCard}>
      <div>
        <div>
          <b>
            <p>{NAME_DATE[day] || "ND"}</p>
          </b>
          <p className={ui.rangeTime}>
            <time>{secondsToTime(startTime)}</time>
            <span>-</span>
            <time>{secondsToTime(endTime)}</time>
          </p>
        </div>
      </div>

      <div>
        <Button disabled={isDeleting} theme="danger" onClick={handleOnDelete}>
          Borrar
        </Button>
      </div>
    </div>
  );
}

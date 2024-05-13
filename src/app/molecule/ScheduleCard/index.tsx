import ui from "@/app/app/horarios/agregar/styles.module.scss";
import React from "react";
import { DayName, TimeTablesItem } from "./types";
import Button from "@/app/atom/button";
import { promptConfirmation } from "@/app/helpers/alerts";
import { secondsToTime } from "@/app/helpers/dates";

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
  urlPicture = "",
  onDelete = () => {},
}: TimeTablesItem) {
  const handleOnDelete = async () => {
    const { isConfirmed } = await promptConfirmation({
      title: "Borrar horario",
      text: "Estas seguro, esta acción no se puede des-hacer",
    });

    if (isConfirmed) onDelete();
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
        <Button theme="danger" onClick={handleOnDelete}>
          Borrar
        </Button>
      </div>
    </div>
  );
}

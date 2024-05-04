import React from "react";
import { ScheduleItem as TypeScheduleItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useTimeTable from "@/app/customHooks/useTimetable";//

export default function DayItem({
  name,
  day,
  urlPicture = null,
}: TypeScheduleItem) {
  const hook = useTimeTable(1);

  // Verificar si day es un objeto con propiedades start y end
  const isRange = typeof day === "object" && day.hasOwnProperty("start") && day.hasOwnProperty("end");
  const startFormatted = isRange ? new Date(day.start) : new Date(day.end);
  const endFormatted = isRange ? new Date(day.end) : null;

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
          {isRange ? (
            <>
              {/* Si es un rango de fechas */}
              <p>
                {/* Desde {startFormatted.toLocaleString("es")} Hasta {endFormatted.toLocaleString("es")} */}
              </p>
            </>
          ) : (
            <>
              {/* Si es una sola fecha */}
              <p>
                {startFormatted.toLocaleString("es")}
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        <Button theme="danger" onClick={hook.promptCancelation}>
          Borrar
        </Button>
      </div>
    </div>
  );
}

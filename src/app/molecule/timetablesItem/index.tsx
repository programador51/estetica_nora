import React from "react";
import { TimeTablesItem as TypeTimeTablesItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useTimeTable from "@/app/customHooks/useTimetable";//

export default function TimeTablesItem({
  name,
  day,
  
}: TypeTimeTablesItem) {
  const hook = useTimeTable(1);
  //  propiedades start y end
  const isRange = typeof day === "object" && day.hasOwnProperty("start") && day.hasOwnProperty("end");
  const startHour = isRange ? day.start : day;
  const endHour = isRange ? day.end : null;

  return (
    <div className={ui.itemCard}>
      <div>
        

        <div>
          <b>
            <p>{name}</p>
          </b>
          {isRange ? (
            <>
              {/* Si es un rango de horas */}
              <p>
                {/* Desde {startHour} Hasta {endHour} */}
              </p>
            </>
          ) : (
            <>
              {/* Si es una sola hora */}
              <p>
                {/* {startHour} */}
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

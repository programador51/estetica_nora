import React, { useContext } from "react";
import ui from "@/app/app/citas/agregar/styles.module.scss";
import { dateToText, secondsToTime } from "@/app/helpers/dates";
import ContextReservation from "@/app/Contexts/ReservationContext";
import uiSchedule from "./styles.module.scss";

export default function ScheduleTime() {
  const hook = useContext(ContextReservation);

  if (typeof hook.timeReservation !== "number" || hook.services.length <= 0)
    return <></>;

  return (
    <div className={ui.time}>
      <b>Horario programado</b>

      <div className={uiSchedule.scheduleProgrammed}>
        <p>{dateToText(hook.day)}</p>
        <p>
          {secondsToTime(hook.timeReservation)} -
          {secondsToTime(
            hook.services.reduce(
              (sum, service) => (sum += service.durationOnMinutes * 60),
              hook.timeReservation
            )
          )}
        </p>
      </div>
    </div>
  );
}

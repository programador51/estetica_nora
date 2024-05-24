import ContextReservation from "@/app/Contexts/ReservationContext";
import CustomError from "@/app/atom/error";
import TimeField from "@/app/atom/timeField";
import {
  secondsToHHMM,
  secondsToTime,
  timeStringToSeconds,
} from "@/app/helpers/dates";
import React, { useContext } from "react";
import ui from "./styles.module.scss";

export default function TimeFieldReservation() {
  const hook = useContext(ContextReservation);

  return (
    <>
      <TimeField
        clearIcon={false}
        name="time"
        required
        amPmAriaLabel=""
        shouldOpenClock={() => false}
        minTime={secondsToHHMM(hook.minTime)}
        maxTime={secondsToHHMM(hook.maxTime)}
        onInvalidChange={() => hook.setTimeReservation(null)}
        onChange={(time) => {
          hook.setTimeReservation(timeStringToSeconds(time as string));
        }}
      />

      {hook.timeReservation === null || hook.timeReservation === undefined ? (
        <CustomError>
          <>
            Selecciona una hora válida
            <ul className={ui.errorTime}>
              {hook.schedule.schedules
                .filter((item) => item.day === hook.day.getDay())
                .map((day, i) => (
                  <li key={`valid-day-${i}`}>
                    {secondsToTime(day.startTime)} -{" "}
                    {secondsToTime(day.endTime)} /{" "}
                    {secondsToHHMM(day.startTime)} -{" "}
                    {secondsToHHMM(day.endTime)}
                  </li>
                ))}
            </ul>
          </>
        </CustomError>
      ) : null}

    </>
  );
}

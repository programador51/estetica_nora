import { useEffect, useState } from "react";

type DaySchedule = {
  name: string;
  schedule: string;
};

const INITIAL_SCHEDULES: DaySchedule[] = [
  {
    name: "Lunes",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Martes",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Miércoles",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Jueves",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Viernes",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Sábado",
    schedule: "10:00am - 07:00pm",
  },
  {
    name: "Domingo",
    schedule: "10:00am - 07:00pm",
  },
];

export default function useSchedules() {
  const [schedules, setSchedules] = useState<DaySchedule[]>(INITIAL_SCHEDULES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Retardo de 1 segundo para simular carga

  }, []);

  return {
    schedules,
    isLoading,
  };
}

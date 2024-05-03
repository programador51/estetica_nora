import { useEffect, useState } from "react";
import { ReturnUseDayItem, StateUseDays } from "./types";

const INITIAL_STATE: StateUseDays = {
  page: 1,
  isLoading: true,
  days: [
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/1_de_enero.png",
      day: {
        start: new Date("2024-01-01T08:00:00"),
        end: new Date("2024-01-01T23:00:00")
      },
      name: "Año Nuevo",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/6_de_febrero-248x300.png",
      day: {
        start: new Date("2024-02-06T10:00:00"),
        end: new Date("2024-02-06T23:00:00")
      },
      name: "Día de la Constitución",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/21_de_marzo-248x300.png",
      day: {
        start: new Date("2024-03-21T12:00:00"),
        end: new Date("2024-03-21T23:00:00")
      },
      name: "Natalicio de Benito Juárez",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/1_de_mayo-248x300.png",
      day: {
        start: new Date("2024-05-01T08:00:00"),
        end: new Date("2024-05-01T23:00:00")
      },
      name: "Día del Trabajo",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/16_de_septiembre.png",
      day: {
        start: new Date("2024-09-16T10:00:00"),
        end: new Date("2024-09-16T23:00:00")
      },
      name: "Día de la Independencia",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/18_de_noviembre-248x300.png",
      day: {
        start: new Date("2024-11-18T12:00:00"),
        end: new Date("2024-11-18T23:00:00")
      },
      name: "Día de la Revolución Mexicana",
    },
    {
      urlPicture: "https://calendario.website/wp-content/uploads/2020/03/25_de_diciembre-248x300.png",
      day: {
        start: new Date("2024-12-25T12:00:00"),
        end: new Date("2024-12-25T23:00:00")
      },
      name: "Día de Navidad",
    },
  ],
};

export default function useDays(): ReturnUseDayItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((current) => ({
      ...current,
      isLoading: false,
    }));
  }, []);

  return {
    ...state,
  };
}


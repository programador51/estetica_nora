import { useEffect, useState } from "react";
import { ReturnUseReservationItem, StateUseReservations } from "./types";

const INITIAL_STATE: StateUseReservations = {
  page: 1,
  isLoading: true,
  reservations: [
    {
      urlPicture: "https://example.com/image1.jpg",
      reservation: new Date("2024-04-15T08:00:00"), // Example date
      name: "José Luis",
    },
    {
      urlPicture: "https://example.com/image2.jpg",
      reservation: new Date("2024-04-16T10:00:00"), // Example date
      name: "Sandra",
    },
    {
      urlPicture: null,
      reservation: new Date("2024-04-17T12:00:00"), // Example date
      name: "Erick",
    },
  ],
};

export default function useReservations(): ReturnUseReservationItem {
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

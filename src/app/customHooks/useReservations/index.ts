import { useEffect, useState } from "react";
import { ReturnUseReservationItem, StateUseReservations } from "./types";

const INITIAL_STATE: StateUseReservations = {
  page: 1,
  isLoading: true,
  reservations: [
    {
      urlPicture: "https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/57/personnel-image-4483.jpg?h=800&w=600&hash=9D5E5FCBEE00EB562DCD8AC8FDA8433D",
      reservation: new Date("2024-04-15T08:00:00"), // Example date
      name: "José Luis",
    },
    {
      urlPicture: "https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/51/personnel-image-3287.jpg?h=800&w=600&hash=F23BF4998F05D0DC079DE43DD0E58507",
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

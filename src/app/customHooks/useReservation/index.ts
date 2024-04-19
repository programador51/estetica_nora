import { promptConfirmation } from "@/app/helpers/alerts";

export default function useReservation(id: number) {
  const promptCancelation = async () => {
    const response = await promptConfirmation({
      title: "¿Cancelar cita?",
      text: `La cita se cancelara y estara sujeto a disponibilidad si deseas volver a reservar`,
    });
  };

  return {
    promptCancelation,
  };
}

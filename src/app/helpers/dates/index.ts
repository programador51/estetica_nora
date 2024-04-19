export function dateToText(date: Date) {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
    }).format(date);
  } catch (error) {
    return "Fecha desconocida";
  }
}

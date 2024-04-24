export function dateToText(date: Date) {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
    }).format(date);
  } catch (error) {
    return "Fecha desconocida";
  }
}

export function formatTime(minutes:number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  let result = "";
  
  if (hours > 0) {
      result += hours + "hr ";
  }
  
  if (remainingMinutes > 0) {
      result += remainingMinutes + "min";
  }
  
  return result.trim();
}
export function dateToText(date: Date) {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
    }).format(date);
  } catch (error) {
    return "Fecha desconocida";
  }
}

export function formatTime(minutes: number) {
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

export function secondsToTime(seconds: number) {
  // Convert seconds to hours, minutes, and optionally AM/PM
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const period = hours >= 12 ? " pm" : " am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

  // Format the time string
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${period}`;
}

export function timeStringToSeconds(timeString: string | number) {
  if (typeof timeString === "number") return timeString;

  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

export function secondsToHHMM(seconds:number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
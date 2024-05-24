export function parseDateWithTime(date: Date) {

  if(process.env.TZ!=="America/Mexico_City"){
    date.setHours(date.getHours() + 4); 
  }

  const dateParsed = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeZone: process.env.TZ||"America/New_York",
  }).format(date);
  const timeParsed = new Intl.DateTimeFormat("es-MX", {
    timeStyle: "medium",
    hour12: true,
    timeZone: process.env.TZ||"America/New_York",
  }).format(date);

  return `${dateParsed} a las ${timeParsed}`;
}

export function dateToText(date: Date) {

  if(process.env.TZ!=="America/Mexico_City"){
    date.setHours(date.getHours() + 4); 
  }

  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeZone: process.env.TZ||"America/New_York",
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

  try {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  } catch (error) {
    return 0;
  }
}

export function dateAtCeroTime(day:Date){

  const copiedDateAlternative = new Date(day)
  copiedDateAlternative.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  return copiedDateAlternative;
}

export function formatDateToYYYYMMDD(date: Date) {

  const unrefDate = dateAtCeroTime(date);

  const year = unrefDate.getFullYear();
  const month = String(unrefDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(unrefDate.getDate()).padStart(2, "0");

  // Concatenate year, month, and day with no separator
  return `${year}-${month}-${day}`;
}

export function secondsToHHMM(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function secondsToDate(seconds: number) {
  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  currentDay.setSeconds(seconds);

  return currentDay;
}

import { format } from "date-fns";

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getMonthFromIndex (monthIndex: number): string {
  return months[monthIndex];
}

export function getMonthFromDate (date: Date): string {
  return getMonthFromIndex(date.getMonth());
}

export function dayOfWeekLabel (day: number): string {
  return days[day];
}

export function getDayOrdinal (day: number): string {
  if (day > 3 && day < 21) {
    return "th";
  }

  switch (day % 10) {
  case 1 :
    return "st";
  case 2:
    return "nd";
  case 3:
    return "rd";
  default:
    return "th";
  }
}

export function formatDate (date: Date, formatTime: boolean) {
  if (!date) {
    return null;
  }

  let formatter = "do MMMM yyyy";

  if (formatTime) {
    formatter += " h:mmaaa";
  }

  return format(date, formatter);
}

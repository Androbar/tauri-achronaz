import type { ClockFormat, DateFormat } from "$stores/types";
import { format } from "date-fns";

export function formatTime(date: Date, format: ClockFormat | undefined): string {
  switch (format) {
    case "HH:MM:SS AM/PM":
      return date.toLocaleTimeString('en-US', { hour12: true });
    case "HH:MM:SS 24H":
      return date.toLocaleTimeString('en-US', { hour12: false });
    case "HH:MM AM/PM":
      return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    case "HH:MM 24H":
      return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    default:
      return date.toLocaleTimeString();
  }
}

export function formatDate(date: Date, dateFormat: DateFormat | undefined): string {
  switch (dateFormat) {
    case "DD/MM/YYYY":
      return format(date, 'dd/MM/yyyy');
    case "DD/MM/YY":
      return format(date, 'dd/MM/yy');
    case "MM/DD/YYYY":
      return format(date, 'MM/dd/yyyy');
    case "MM/DD/YY":
      return format(date, 'MM/dd/yy');
    default:
      return date.toLocaleDateString();
  }
}
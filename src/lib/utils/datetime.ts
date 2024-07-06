import type { ClockFormat } from "$stores/types";

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
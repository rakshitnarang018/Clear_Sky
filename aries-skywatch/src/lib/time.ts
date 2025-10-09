import { format, formatDistanceToNow, parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

const IST_TIMEZONE = "Asia/Kolkata";

export function formatIST(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  const istTime = toZonedTime(d, IST_TIMEZONE);
  return format(istTime, "h:mm a, MMM d");
}

export function formatISTFull(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  const istTime = toZonedTime(d, IST_TIMEZONE);
  return format(istTime, "PPpp") + " IST";
}

export function formatUTC(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "PPpp") + " UTC";
}

export function formatRelative(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function getCurrentIST(): Date {
  return toZonedTime(new Date(), IST_TIMEZONE);
}

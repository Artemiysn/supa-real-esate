import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().substring(0, 10);
}

export function displayDateAndTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dateString = dateObj.toISOString().substring(0, 10);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  return dateString + ' ' +  formattedTime;
}

export function isGPSCoordinate(lat: any, lon: any) {

  if (
    lat === undefined ||
    lon === undefined ||
    lat === "" ||
    lon === "" ||
    lat === null ||
    lon === null
  )
    return false;

  if (
    Number(lat) >= -90 &&
    Number(lat) <= 90 &&
    Number(lon) >= -180 &&
    Number(lon) <= 180
  )
    return true;

  return false;
}

export const jsonStringifyFixed = (param: any): any => {
  return JSON.stringify(
    param,
    (key, value) => (typeof value === "bigint" ? value.toString() : value)
  );
};

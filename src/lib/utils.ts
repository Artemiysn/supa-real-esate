import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayDate(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export function isPositiveNumber(value: number | string | undefined): boolean {
  return Number(value) > 0;
}

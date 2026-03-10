import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate } from "./date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { formatDate };

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes without conflicts.
 * Example: cn("p-4 bg-red-500", isHover && "bg-blue-500") -> "p-4 bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Simple delay function for testing loading states
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitizeString = (str: string) => {
  return str
    .replace(/^-\s*/gm, "") // Remove leading dashes and spaces
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
}

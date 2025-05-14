import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EnvMap = {
  dev: import.meta.env.VITE_IFRAME_DEV_URL,
  prod: import.meta.env.VITE_IFRAME_URL,
  altProd: import.meta.env.VITE_IFRAME_ALT_URL
} as const

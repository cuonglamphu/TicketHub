import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
export const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

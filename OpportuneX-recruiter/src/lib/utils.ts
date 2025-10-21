import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getData() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove({
        data: 1,
      });
    }, 2000);
  });
}

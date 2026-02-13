import { type ClassValue, clsx } from "clsx";
import { createTailwindMerge, getDefaultConfig } from "tailwind-merge";

const twMerge = createTailwindMerge(() => ({
  ...getDefaultConfig(),
  prefix: "rm-",
}));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

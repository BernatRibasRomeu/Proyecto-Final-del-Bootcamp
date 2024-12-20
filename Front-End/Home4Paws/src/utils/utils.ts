export function classNames(...classes: (string | undefined | boolean | null)[]) {
    return classes.filter(Boolean).join(' ');
  }
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple helper to read current page path for attribution
export function getCurrentPageLabel(): string {
  if (typeof window === 'undefined') return 'unknown';
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/partners')) return 'Partners';
  if (path.startsWith('/meet-pip')) return 'Meet Pip';
  if (path.startsWith('/ambassador-program')) return 'Ambassador Program';
  if (path.startsWith('/careers')) return 'Careers';
  if (path.startsWith('/cities')) return 'Cities';
  if (path.startsWith('/communities')) return 'Communities';
  if (path.startsWith('/about')) return 'About';
  if (path.startsWith('/contact')) return 'Contact';
  return 'Home';
}

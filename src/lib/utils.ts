import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names with conditional rendering and merges Tailwind CSS classes
 * 
 * @param inputs - Array of class names, conditionally rendered classes, or undefined values
 * @returns A merged string of unique Tailwind CSS classes
 * 
 * @example
 * // Merges classes, handles conditional rendering
 * cn('text-red-500', isActive && 'font-bold', { 'hidden': !isVisible })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Nigerian Naira currency
 * 
 * @param amount - The numerical amount to be formatted
 * @returns A string representation of the amount in Nigerian Naira
 * 
 * @example
 * // Returns "₦1,000.00"
 * formatNaira(1000)
 * 
 * @example
 * // Returns "₦1,234,567.89"
 * formatNaira(1234567.89)
 */
export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
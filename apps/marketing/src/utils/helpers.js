import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for optimal class merging
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in MXN currency
 * @param {number} price - Price to format
 * @returns {string} Formatted price
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
}

/**
 * Delays execution for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates a random ID
 * @returns {string} Random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Checks if device is mobile based on viewport
 * @returns {boolean} True if mobile viewport
 */
export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Smooth scroll to element by ID
 * @param {string} elementId - Element ID to scroll to
 */
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

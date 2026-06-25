import { isValidDate } from "./isValidDate.js";

/**
 * Converts a string in ISO 8601 format to a Date object.
 *
 * @param {string} dateString - The string to convert.
 * @returns {Date} - The Date object.
 * @throws {Error} - If the string is not in a valid format.
 */
export const parseISODate = (dateString: string): Date => {
  const date = new Date(dateString);
  if (isValidDate(date)) {
    return date;
  } else {
    throw new Error("Invalid ISO date string");
  }
};

export const { isValidDate } = require("./isValidDate");
export const { parseISODate } = require("./parseISODate");

/**
 * Calculates the difference between two dates and returns the selected fields.
 *
 * @param {Date|string} startDate - The start date. Can be a Date object or a string in ISO 8601 format.
 * @param {Date|string} endDate - The end date. Can be a Date object or a string in ISO 8601 format.
 * @returns {Object} - An object containing the selected fields and their values.
 * @throws {Error} - If startDate or endDate are not valid date objects or strings in ISO 8601 format.
 */
export const dateDiff = (startDate, endDate) => {
  // Convert strings to Date objects if necessary
  if (typeof startDate === "string") {
    startDate = parseISODate(startDate);
  }
  if (typeof endDate === "string") {
    endDate = parseISODate(endDate);
  }

  // Validate startDate and endDate
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    throw new Error("Invalid start or end date");
  }

  const millisecondsDiff = Math.abs(endDate - startDate);
  const result = {};

  // Calculate all units at once
  const totalSeconds = millisecondsDiff / 1000;
  result.hours = Math.floor(totalSeconds / 3600);
  result.minutes = Math.floor((totalSeconds % 3600) / 60);
  result.seconds = Math.floor(totalSeconds % 60);
  result.milliseconds = millisecondsDiff % 1000;

  return result;
};

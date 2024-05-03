const { isValidDate } = require("./isValidDate");

/**
 * Converts a string in ISO 8601 format to a Date object.
 *
 * @param {string} dateString - The string to convert.
 * @returns {Date} - The Date object.
 * @throws {Error} - If the string is not in a valid format.
 */
const parseISODate = (dateString) => {
  const date = new Date(dateString);
  if (isValidDate(date)) {
    return date;
  } else {
    throw new Error("Invalid ISO date string");
  }
};

module.exports = { parseISODate };

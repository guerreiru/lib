const dayjs = require("dayjs");

/**
 * Validates and returns a date range.
 *
 * @param {Date|string} startDate - The start date of the range. It can be a Date object or a string in the date format recognized by JavaScript.
 * @param {Date|string} endDate - The end date of the range. It can be a Date object or a string in the date format recognized by JavaScript.
 * @returns {Object} - An object containing the validated start and end dates.
 */

const validateDateInterval = (startDate, endDate) => {
  let defaultEndDate = new Date();
  let defaultStartDate = new Date();
  defaultStartDate.setDate(defaultEndDate.getDate() - 30);

  if (startDate && dayjs(startDate).isValid()) {
    defaultStartDate = new Date(startDate);
  }

  if (endDate && dayjs(endDate).isValid()) {
    defaultEndDate = new Date(endDate);
  }

  if (dayjs(defaultStartDate).isAfter(defaultEndDate)) {
    [defaultStartDate, defaultEndDate] = [defaultEndDate, defaultStartDate];
  }

  return { startDate: defaultStartDate, endDate: defaultEndDate };
};

module.exports = { validateDateInterval };

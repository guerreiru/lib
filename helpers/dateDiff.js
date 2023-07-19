const { isAValidDate } = require("./isAValidDate");

/**
 * Calculates the difference between two dates and returns the selected fields.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @param {...string} selectedOptions - The selected fields (optional). Available options: "hours", "minutes", "seconds", "milliseconds".
 * @returns {Object} - An object containing the selected fields and their values.
 */

const dateDiff = (startDate, endDate, ...selectedOptions) => {
  const options = ["hours", "minutes", "seconds", "milliseconds"];

  if (!selectedOptions.length) {
    selectedOptions = options;
  }

  if (isAValidDate(startDate) && isAValidDate(endDate)) {
    const millisecondsDiff = Math.abs(endDate - startDate);

    // Calculation of seconds
    const secondsDiff = Math.floor(millisecondsDiff / 1000);
    let milliseconds = millisecondsDiff % 1000;

    // Calculation of hours
    const hours = Math.floor(secondsDiff / 3600);
    let seconds = secondsDiff % 3600;

    // Calculation of minutes
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    const result = {};

    selectedOptions.forEach((key) => {
      if (options.includes(key)) {
        result[key] = eval(key);
      }
    });

    return result;
  }
};

module.exports = { dateDiff };

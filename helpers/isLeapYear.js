const isLeapYear = (year) => {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return "Is leap year";
  } else {
    return "Not leap year";
  }
};

module.exports = { isLeapYear };

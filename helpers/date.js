const DateManipulator = {
  currentDate: () => new Date(),

  addHours: (amountOfHours, date = new Date()) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + amountOfHours);
    return newDate;
  },

  subtractHours: (amountOfHours, date = new Date()) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - amountOfHours);
    return newDate;
  },

  getStartOfDay: (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },

  getEndOfDay: (date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  },
};

module.exports = {
  DateManipulator,
};

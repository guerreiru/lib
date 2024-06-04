/**
 * Returns the name of the month in Portuguese for the given month index.
 *
 * @param {number} monthIndex - The month index (0-11).
 * @returns {string} The name of the month in lowercase.
 */

export const monthName = (currentMonth) => {
  const monthIndex = currentMonth ?? new Date().getMonth();

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  });

  return formatter.format(new Date(0, monthIndex));
};

export const monthNames = () =>
  Array.from({ length: 12 }, (_, idx) => monthName(idx));

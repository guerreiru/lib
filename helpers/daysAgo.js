/**
 * Retorna a data correspondente ao número de dias atrás especificado.
 * Se nenhum número de dias for fornecido, retorna a data de hoje.
 *
 * @param {number} days - O número de dias atrás a ser calculado.
 * @returns {Date} A data correspondente ao número de dias atrás especificado.
 */
export const daysAgo = (days) => {
  if (!days) {
    return new Date();
  }

  const currDate = new Date();
  const subtractedDate = new Date(currDate.setDate(currDate.getDate() - days));
  return subtractedDate;
};

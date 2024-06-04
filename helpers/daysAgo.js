/**
 * Retorna a data correspondente ao número especificado de dias atrás a partir da data atual.
 * Se nenhum número de dias for fornecido, retorna a data de um dia atrás.
 * @param {number} days - O número de dias atrás a partir da data atual.
 * @returns {Date} - A data correspondente ao número especificado de dias atrás.
 */
const daysAgo = (days) => {
  if (!days) {
    return daysAgo(1);
  }

  const currDate = new Date();
  const subtractedDate = new Date(currDate.setDate(currDate.getDate() - days));
  return subtractedDate;
};

module.exports = { daysAgo };

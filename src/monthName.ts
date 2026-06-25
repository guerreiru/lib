/**
 * Retorna o nome do mês correspondente ao número do mês fornecido.
 * Se nenhum número for fornecido, retorna o nome do mês atual.
 * @param {number} [currentMonth] - O número do mês (0-11) para o qual obter o nome. Se não for fornecido, usa o mês atual.
 * @returns {string} O nome do mês correspondente ao número fornecido ou ao mês atual.
 */
export const monthName = (currentMonth?: number): string => {
  const monthIndex = currentMonth ?? new Date().getMonth();

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  });

  return formatter.format(new Date(0, monthIndex));
};

export const monthNames = () =>
  Array.from({ length: 12 }, (_, idx) => monthName(idx));

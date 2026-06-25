/**
 * Verifica se um valor é uma data válida.
 *
 * @param {*} value - O valor a ser verificado.
 * @returns {boolean} - True se o valor for uma data válida, false caso contrário.
 */
export const isValidDate = (value: unknown): boolean =>
  value instanceof Date && !isNaN(value.getTime());

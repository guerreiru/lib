/**
 * Verifica se um valor é uma data válida.
 *
 * @param {*} value - O valor a ser verificado.
 * @returns {boolean} - True se o valor for uma data válida, false caso contrário.
 */
const isValidDate = (value) => value instanceof Date && !isNaN(value.getTime());

module.exports = { isValidDate };

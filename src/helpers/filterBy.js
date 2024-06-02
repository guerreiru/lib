/**
 * Filtra um array de objetos com base em uma chave específica.
 *
 * @param {Array<Object>} data - O array de objetos a ser filtrado.
 * @param {string} filter - A chave pela qual os objetos serão filtrados.
 * @returns {Array<Object>} Um novo array contendo apenas os objetos que possuem valor para a chave especificada.
 */
export const filterBy = (data, filter) => {
  return data.filter((item) => item[filter]);
};

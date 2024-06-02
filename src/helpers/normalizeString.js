/**
 * Formata um valor removendo espaços, acentos e convertendo para maiúsculas.
 * @param {string} valor O valor a ser formatado.
 * @param {string} separator O caracter que irá reparar as palavras.
 * @returns {string} O valor formatado.
 */
export const normalizeString = (valor, separator = "_") => {
  return valor
    .replace(/ /g, separator) // Substitui espaços por underline
    .normalize("NFD") // Normaliza caracteres unicode para decomposição
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacríticos
};

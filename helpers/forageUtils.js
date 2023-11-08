/**
 * Calcula o crescimento da forragem
 *
 * @param {Number} averageEntryOrScouting Média das alturas da última coleta de entrada OU aferição
 * @param {Number} averageOutputCollection Média das alturas da última coleta de saída
 * @returns {Number} taxa de crescimento da forragem
 */

const growth = (averageEntryOrScouting, averageOutputCollection) =>
  averageEntryOrScouting / averageOutputCollection;

/**
 * Calcula o crescimento esperado da forragem
 *
 * @param {Number} entranceHeight Altura Entrada
 * @param {Number} outputHeight Altura Saída
 * @param {Number} forageRestDaysForThePeriod Quantidade dias de descanso cadastrado no ciclo de forragem para o período da coleta
 * @returns {Number} taxa de crescimento esperado da forragem
 */

const expectedGrowth = (
  entranceHeight,
  outputHeight,
  forageRestDaysForThePeriod
) => {
  return (entranceHeight - outputHeight) / forageRestDaysForThePeriod;
};

module.exports = { growth, expectedGrowth };

// Função para calcular o peso projetado
const calculateProjectedWeight = (
  lastWeighing,
  currentWeight,
  weightGainCurve,
  currentDate
) => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const elapsedDays = Math.floor(
    (currentDate - lastWeighing) / millisecondsInADay
  );

  const monthOfLastWeighIn = lastWeighing.getMonth() + 1; // Mês da última pesagem (1 a 12)
  const dailyWeightGain = weightGainCurve[monthOfLastWeighIn];

  const periodWeightGain = dailyWeightGain * elapsedDays;
  const projectedWeight = currentWeight + periodWeightGain;

  return projectedWeight;
};

// Exemplo de uso
// const lastWeighing = new Date(2023, 4, 1); // 01/05/2023
// const currentWeight = 350; // 350kg/cab

// const weightGainCurve = {
//   5: 0.5, // Maio: Ganho de 0,5kg/dia
// };

// const currentDate = new Date(2023, 4, 15); // 15/05/2023

// const projectedWeight = calculateProjectedWeight(
//   lastWeighing,
//   currentWeight,
//   weightGainCurve,
//   currentDate
// );

module.exports = { calculateProjectedWeight };

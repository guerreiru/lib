function countDaysPerMonth(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const result = {};

  for (let i = 1; i <= totalDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const currentMonth = currentDate
      .toLocaleString("en-US", { month: "long" })
      .toLowerCase();

    result[currentMonth] = (result[currentMonth] || 0) + 1;
  }

  return result;
}

function calculateProjectedWeight(
  lastWeighingDate,
  lastWeight,
  weightGainCurve,
  currentDate
) {
  const daysPerMonth = countDaysPerMonth(lastWeighingDate, currentDate);

  let projectedWeight = lastWeight;

  for (const month in daysPerMonth) {
    const dailyGain = weightGainCurve[month] || 0;
    projectedWeight += dailyGain * daysPerMonth[month];
  }

  return projectedWeight;
}

// Example usage
// const lastWeighingDate = "2024-02-15T23:59:59.999Z";
// const lastWeight = 342;
// const currentDate = "2024-03-01T23:59:59.999Z";

// const projectedWeight = calculateProjectedWeight(lastWeighingDate, lastWeight, weightGainCurve, currentDate);
// console.log(projectedWeight);

module.exports = { calculateProjectedWeight };

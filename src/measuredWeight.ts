function countDaysPerMonth(startDate: string | Date, endDate: string | Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const result: Record<string, number> = {};

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

export function calculateProjectedWeight(
  lastWeighingDate: Date,
  lastWeight: number,
  weightGainCurve: Record<string, number>,
  currentDate: Date,
) {
  const daysPerMonth = countDaysPerMonth(lastWeighingDate, currentDate);

  lastWeighingDate.setHours(0);
  lastWeighingDate.setMinutes(0);
  lastWeighingDate.setSeconds(0);

  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);

  let projectedWeight = lastWeight;

  for (const month in daysPerMonth) {
    const dailyGain = weightGainCurve[month] || 0;
    projectedWeight += dailyGain * daysPerMonth[month];
  }

  return projectedWeight;
}

// Example usage
// export const lastWeighingDate = "2024-02-15T23:59:59.999Z";
// export const lastWeight = 342;
// export const currentDate = "2024-03-01T23:59:59.999Z";
// const weightGainCurve =

// export const projectedWeight = calculateProjectedWeight(lastWeighingDate, lastWeight, weightGainCurve, currentDate);
// console.log(projectedWeight);

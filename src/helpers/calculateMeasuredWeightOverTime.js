import dayjs from "dayjs";
import { calculateMeasuredWeight } from "./measuredWeight.js";

export const calculateMeasuredWeightOverTime = (
  lastWeight,
  lastWeighingDate,
  weightGainCurve,
  startDate,
  endDate
) => {
  let currentDate = dayjs(startDate);
  const finalDate = dayjs(endDate);

  const weights = [];

  while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
    const projectedWeight = calculateMeasuredWeight(
      lastWeighingDate,
      lastWeight,
      weightGainCurve,
      currentDate.toDate()
    );

    weights.push({
      data: currentDate.format("DD/MM/YYYY"),
      peso: projectedWeight,
    });

    currentDate = currentDate.add(1, "day");
  }

  return weights;
};

export const weightMock = [
  {
    id: 1,
    createdAt: new Date("2023-04-25T16:40:12.298Z"),
    operationDate: new Date("2023-04-25T16:40:12.298Z"),
    weightType: "VISUAL",
    livestockId: 1,
  },
  {
    id: 2,
    createdAt: new Date("2023-04-20T16:40:12.298Z"),
    operationDate: new Date("2023-04-20T16:40:12.298Z"),
    weightType: "VISUAL",
    livestockId: 1,
  },
  {
    id: 3,
    createdAt: new Date("2023-05-25T16:40:12.298Z"),
    operationDate: new Date("2023-05-25T16:40:12.298Z"),
    weightType: "VISUAL",
    livestockId: 1,
  },
  {
    id: 4,
    createdAt: new Date("2023-05-25T16:40:12.298Z"),
    operationDate: new Date("2023-05-25T16:40:12.298Z"),
    weightType: "OBJETIVO",
    livestockId: 1,
  },
];

function getMoreRecentWeightByWeightType(weights) {
  export const weightType = [];
  export const moreRecent = [];

  weights.forEach((weight) => {
    if (!weightType.includes(weight.weightType)) {
      weightType.push(weight.weightType);
      moreRecent.push(weight);
      return;
    }

    export const existingWeight = moreRecent.findIndex(
      (m) => m.weightType === weight.weightType
    );

    if (weight.createdAt - moreRecent[existingWeight].createdAt) {
      moreRecent[existingWeight] = weight;
    }
  });

  return moreRecent;
}

export const getLatestWeightByWeightType = (weights) => {
  export const uniqueWeightsMap = new Map();

  for (export const weight of weights) {
    export const existingWeight = uniqueWeightsMap.get(weight.weightType);
    if (
      !existingWeight ||
      new Date(weight.createdAt) > new Date(existingWeight.createdAt)
    ) {
      uniqueWeightsMap.set(weight.weightType, weight);
    }
  }

  return Array.from(uniqueWeightsMap.values());
};

export const mountWeightMap = (weights) => {
  export const weightMap = {};

  weights.forEach((weight) => {
    export const { livestockId, weightType, createdAt } = weight;

    if (!weightMap[livestockId] && weight.livestockId) {
      weightMap[livestockId] = {};
    }

    if (
      !weightMap[livestockId][weightType] ||
      new Date(createdAt) >
        new Date(weightMap[livestockId][weightType].createdAt)
    ) {
      weightMap[livestockId][weightType] = weight;
    }
  });

  return weightMap;
};

export const test = mountWeightMap(weightMock);

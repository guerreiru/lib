export const groupBy = (array, key) =>
  array.reduce((groupedArray, item) => {
    const groupKey = String(item[key]);
    groupedArray[groupKey] ??= [];
    groupedArray[groupKey].push(item);
    return groupedArray;
  }, {});

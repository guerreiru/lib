export const groupBy = (array: Array<Record<string, any>>, key: string) =>
  array.reduce((groupedArray, item) => {
    const groupKey = String(item[key]);
    groupedArray[groupKey] ??= [];
    groupedArray[groupKey].push(item);
    return groupedArray;
  }, {});

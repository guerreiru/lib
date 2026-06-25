export const revertArray = <T>(arrToReverse: T[]): T[] =>
  arrToReverse.map((_, idx, arr) => arr[arr.length - idx - 1]);

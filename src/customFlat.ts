export const flattenDeep = (array: any[]): any[] =>
  array.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc.concat(flattenDeep(curr));
    } else {
      return acc.concat(curr);
    }
  }, []);

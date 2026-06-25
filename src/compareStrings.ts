export const compareStrings = (s1: string, s2: string): boolean =>
  JSON.stringify(s1) === JSON.stringify(s2);

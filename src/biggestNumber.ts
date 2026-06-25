export const biggestNumber = (numbers: number[]): number => {
  const biggest = numbers.reduce(
    (max, curr) => (curr > max ? curr : max),
    numbers[0],
  );
  return biggest;
};

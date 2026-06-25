export const hasValue = (value: string | number | null | undefined) =>
  typeof value === "string" ? `'${value}'` : value;

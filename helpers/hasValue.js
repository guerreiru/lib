export const hasValue = (value) =>
  typeof value === "string" ? `'${value}'` : value;

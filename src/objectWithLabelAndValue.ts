import { normalizeString } from "./normalizeString.js";

export const objectWithLabelAndValue = (
  values: string[],
): { label: string; value: string }[] =>
  values.map((valor) => ({
    label: normalizeString(valor).toLowerCase(),
    value: valor,
  }));

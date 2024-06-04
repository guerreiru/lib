export const { normalizeString } = require("./normalizeString");

export const objectWithLabelAndValue = (values) =>
  values.map((valor) => ({
    label: normalizeString(valor).toLowerCase(),
    value: valor,
  }));

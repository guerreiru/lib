const hasValue = (value) => (typeof value === "string" ? `'${value}'` : value);

module.exports = { hasValue };

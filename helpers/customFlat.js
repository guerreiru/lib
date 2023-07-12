const customFlat = (array, depth = 1) => {
  const newArray = [];

  function flatten(array, currentDepth) {
    array.forEach((item) => {
      if (Array.isArray(item) && currentDepth < depth) {
        flatten(item, currentDepth + 1);
      } else {
        newArray.push(item);
      }
    });
  }

  flatten(array, 0);
  return newArray;
};

module.exports = { customFlat };

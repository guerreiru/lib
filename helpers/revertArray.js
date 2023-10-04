const revertArray = (arrToReverse) =>
  arrToReverse.map((_, idx, arr) => arr[arr.length - idx - 1]);

module.exports = { revertArray };

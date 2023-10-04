const diagonalDifference = (arr) => {
  let leadingDiagonal = 0;
  let secondaryDiagonal = 0;

  for (let i = 0; i < arr.length; i++) {
    const elementAtIndexI = arr[i];

    for (let j = 0; j < elementAtIndexI.length; j++) {
      const elementAtIndexJ = elementAtIndexI[j];

      if (i === j) {
        leadingDiagonal += elementAtIndexJ;
      }

      if (i + j === elementAtIndexI.length - 1) {
        secondaryDiagonal += elementAtIndexJ;
      }
    }
  }

  return Math.abs(leadingDiagonal - secondaryDiagonal);
};

module.exports = { diagonalDifference };

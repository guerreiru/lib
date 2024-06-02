/**
 * Calculates the number of bricks needed for a wall.
 *
 * @param {object} wall - Object that represents the wall with height and wallLength properties in meters.
 * @param {object} brick - Object that represents the brick with properties height and brickLength in centimeters.
 * @returns {number} The number of bricks needed per wall.
 * @throws {Error} If the input properties are invalid.
 */

export const brickPerWall = (wall, brick) => {
  if (
    !wall ||
    !brick ||
    !wall.height ||
    !wall.wallLength ||
    !brick.height ||
    !brick.brickLength
  ) {
    throw new Error("The wall and brick properties are mandatory");
  }

  if (
    typeof wall.height !== "number" ||
    typeof wall.wallLength !== "number" ||
    typeof brick.height !== "number" ||
    typeof brick.brickLength !== "number" ||
    wall.height <= 0 ||
    wall.wallLength <= 0 ||
    brick.height <= 0 ||
    brick.brickLength <= 0
  ) {
    throw new Error("Dimensions must be positive numbers.");
  }

  const wallHeightInCm = wall.height * 100;
  const wallLengthInCm = wall.wallLength * 100;

  const bricksInHeight = wallHeightInCm / brick.height;
  const bricksInLength = wallLengthInCm / brick.brickLength;

  const bricksNeeded = Math.round(bricksInHeight * bricksInLength);

  return bricksNeeded;
};

/**
 * Calculates the total number of bricks needed for all walls.
 *
 * @param {array} walls - A list of objects that represent walls.
 * @param {object} brick - Object that represents the brick with properties height and brickLength in centimeters.
 * @returns {number} The total number of bricks required.
 * @throws {Error} If the input properties are invalid.
 */

export const totalBricksNeeded = (walls, brick) => {
  if (!Array.isArray(walls) || walls.length === 0) {
    throw new Error("The list of walls must be a non-empty array.");
  }

  if (!brick || !brick.height || !brick.brickLength) {
    throw new Error(
      "The brick property is mandatory and must have height and brickLength properties."
    );
  }

  if (
    typeof brick.height !== "number" ||
    typeof brick.brickLength !== "number" ||
    brick.height <= 0 ||
    brick.brickLength <= 0
  ) {
    throw new Error("Brick dimensions must be positive numbers.");
  }

  return walls.reduce((prev, curr) => prev + brickPerWall(curr, brick), 0);
};

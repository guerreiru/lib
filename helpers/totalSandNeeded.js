const SAND_PER_SQUARE_METER = 30;
const SAND_DENSITY_PER_LITER = 1.6;

const calcWallArea = (wall) => wall.height * wall.wallLength;

const totalSandNeeded = (
  walls,
  sand_density_per_liter = SAND_DENSITY_PER_LITER
) => {
  const wallArea = walls.reduce((prev, curr) => prev + calcWallArea(curr), 0);
  const QuantityOfSandInLiters = Math.ceil(wallArea * SAND_PER_SQUARE_METER);
  const QuantityOfSandInKilos = Math.ceil(
    QuantityOfSandInLiters * sand_density_per_liter
  );

  return {
    quilos: QuantityOfSandInKilos,
    litros: QuantityOfSandInLiters,
  };
};

module.exports = { totalSandNeeded };

const CEMENT_PER_SQUARE_METER = 10;
const CEMENT_DENSITY_PER_LITER = 1.4;

const calcWallArea = (wall) => wall.height * wall.wallLength;

const totalCementNeeded = (
  walls,
  cement_density_per_liter = CEMENT_DENSITY_PER_LITER
) => {
  const wallArea = walls.reduce((prev, curr) => prev + calcWallArea(curr), 0);
  const QuantityOfCementInLiters = Math.ceil(
    wallArea * CEMENT_PER_SQUARE_METER
  );
  const QuantityOfCementInKilos = Math.ceil(
    QuantityOfCementInLiters * cement_density_per_liter
  );

  return {
    quilos: QuantityOfCementInKilos,
    litros: QuantityOfCementInLiters,
  };
};

module.exports = { totalCementNeeded };

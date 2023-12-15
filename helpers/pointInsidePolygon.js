const pointInsidePolygon = (polygonCoors, point) => {
  const x = point.lat;
  const y = point.lon;

  let inside = false;

  for (
    let i = 0, j = polygonCoors.length - 1;
    i < polygonCoors.length;
    j = i++
  ) {
    const xi = polygonCoors[i].lat;
    const yi = polygonCoors[i].lon;
    const xj = polygonCoors[j].lat;
    const yj = polygonCoors[j].lon;

    const intersection =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersection) {
      inside = !inside;
    }
  }

  return inside;
};

module.exports = { pointInsidePolygon };

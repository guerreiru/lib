const pointInsidePoligono = (polygonCoords, point) => {
  const x = point.lat;
  const y = point.lng;

  let inside = false;

  for (
    let i = 0, j = polygonCoords.length - 1;
    i < polygonCoords.length;
    j = i++
  ) {
    const xi = polygonCoords[i].lat;
    const yi = polygonCoords[i].lng;
    const xj = polygonCoords[j].lat;
    const yj = polygonCoords[j].lng;

    const intersection =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersection) {
      inside = !inside;
    }
  }

  return inside;
};

module.exports = { pointInsidePoligono };

export const convertObjToGeoJson = (coordinates) => {
  const geoJson = [];
  coordinates.forEach((coord) => {
    geoJson.push(Object.values(coord));
  });

  geoJson.push(geoJson[0]);

  return geoJson;
};

export const convertGeoJsonToObj = (geoJson) => {
  const coords = [];

  geoJson[0].forEach((coord) => {
    coords.push({
      lat: coord[0],
      lng: coord[1],
    });
  });

  coords.pop();
  return JSON.stringify(coords);
};

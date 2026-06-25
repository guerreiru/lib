interface Coordinate {
  lat: number;
  lng: number;
}

export const convertObjToGeoJson = (coordinates: Coordinate[]): number[][] => {
  const geoJson: number[][] = [];
  coordinates.forEach((coord) => {
    geoJson.push(Object.values(coord));
  });

  geoJson.push(geoJson[0]);

  return geoJson;
};

export const convertGeoJsonToObj = (geoJson: number[][][]): string => {
  const coords: Coordinate[] = [];

  geoJson[0].forEach((coord) => {
    coords.push({
      lat: coord[0],
      lng: coord[1],
    });
  });

  coords.pop();
  return JSON.stringify(coords);
};

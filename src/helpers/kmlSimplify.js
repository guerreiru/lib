import simplify from "@turf/simplify";

export const makeGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [coords.map((coord) => [coord.lng, coord.lat])],
      },
      properties: { name: "MAKE" },
      id: "make-geo-json",
    },
  ],
};

export const options = { tolerance: 0.0001, highQuality: true };
export const simplified = simplify(makeGeoJson, options);
export const simplifiedCoords = simplified.features[0].geometry.coordinates[0];
export const geoJsonToObj = simplifiedCoords.map((coord) => ({
  lng: coord[0],
  lat: coord[1],
}));

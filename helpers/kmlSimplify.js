const simplify = require("@turf/simplify");
const coords = require("./IdPasto=56083.json");

const makeGeoJson = {
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

const options = { tolerance: 0.0001, highQuality: true };
const simplified = simplify(makeGeoJson, options);
const simplifiedCoords = simplified.features[0].geometry.coordinates[0];
const geoJsonToObj = simplifiedCoords.map((coord) => ({
  lng: coord[0],
  lat: coord[1],
}));

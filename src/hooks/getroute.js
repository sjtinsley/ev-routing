import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'
import { callDirectionsApi } from '../services/directions_API.js';


export const getRoute = async (hereOutput) => {
  const route = await callDirectionsApi(hereOutput);
  const routegeojson = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: route.geometry
    }
  };
  console.log(routegeojson)
  return {route: routegeojson,
    distance: route.distance,
    duration: route.duration
  }
}
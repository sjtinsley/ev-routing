import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'
import { callDirectionsApi } from '../services/directions_API.js';


export const getRoute = async (textOrigin, textDestination) => {
  var origin = await callGeocodingApi(textOrigin)
  var destination = await callGeocodingApi(textDestination)
  // console.log(origin, destination);
  const hereOutput = await callHereApi(origin, destination);
  console.log(`EV Routing API called`);
  const route = await callDirectionsApi(hereOutput);
  const routegeojson = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: route
    }
  };
  console.log(routegeojson)
  return routegeojson;
}
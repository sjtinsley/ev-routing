import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'
import { callDirectionsApi } from '../services/directions_API.js';


export const getWayPoints = async (textOrigin, textDestination, vehicle) => {
  var origin = await callGeocodingApi(textOrigin)
  var destination = await callGeocodingApi(textDestination)
  // console.log(origin, destination);
  const hereOutput = await callHereApi(origin, destination, vehicle);
  return hereOutput
}
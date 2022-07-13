import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'
import { callDirectionsApi } from '../services/directions_API.js';
import axios from 'axios';

export const getPOIs = async (textOrigin, textDestination) => {
  var origin = await callGeocodingApi(textOrigin);
  var destination = await callGeocodingApi(textDestination);
  // console.log(origin, destination);
  const hereOutput = await callHereApi(origin, destination);
  console.log(`EV Routing API called`);
  const params = hereOutput;
  console.log(params);
  const res = await axios.get(`http://localhost:3030`, { params });
  const persons = res.data;
  console.log(persons);
}
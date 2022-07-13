import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'
import { callDirectionsApi } from '../services/directions_API.js';
import axios from 'axios';

export const getPOIs = async (hereOutput) => {
  const params = hereOutput;
  console.log(params);
  const res = await axios.get(`http://localhost:3030`, { params });
  const persons = res.data;
  console.log(persons);
}
import axios from 'axios';

export const getPOIs = async (hereOutput) => {
  const hereArray = hereOutput.split('%3B');
  const hereTrimmed = hereArray.slice(1, -1).join('%3B');
  const params = hereTrimmed;
  const res = await axios.get(`http://localhost:3030`, { params });
  const locations = res.data;
  console.log(locations)
  return locations
}
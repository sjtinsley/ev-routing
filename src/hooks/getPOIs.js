import axios from 'axios';

export const getPOIs = async (hereOutput) => {
  const params = hereOutput;
  const res = await axios.get(`http://localhost:3030`, { params });
  const locations = res.data;
  console.log(locations);
  return locations
}
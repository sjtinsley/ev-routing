const env = require("../../.env")
  
export const callDirectionsApi = async (callHereOutput) => {
  
  const geoJSON = null;

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${callHereOutput}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${env.mapbox_access_token}`;
  
  const response = await fetch(url, {
    method: "GET",
  })
  
  const body = await response.json()
  return body;
  };


// callDirectionsApi("-73.98866549245983%2C40.73152488986574%3B-73.98681711493084%2C40.733821006105444");
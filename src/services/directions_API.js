const env = require("../../.env")
  
export const callDirectionsApi = async (callHereOutput) => {
  
  const geoJSON = null;
  let tripMins = '';
  let tripMiles = '';

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${callHereOutput}?geometries=geojson&language=en&overview=full&steps=true&annotations=distance%2cduration&access_token=${env.mapbox_access_token}`;
  
  const response = await fetch(url, {
    method: "GET",
  })
  
  const body = await response.json()
  tripMins = Math.round((body.routes[0].duration)/60);
  tripMiles = Math.round((body.routes[0].distance)/1609);
  // console.log({
  //   geometry: body.routes[0].geometry.coordinates,
  //   distance: tripMiles,
  //   duration: tripMins
  // })
  return {
    geometry: body.routes[0].geometry.coordinates,
    distance: tripMiles,
    duration: tripMins
  };
  };


// callDirectionsApi("-73.98866549245983%2C40.73152488986574%3B-73.98681711493084%2C40.733821006105444");

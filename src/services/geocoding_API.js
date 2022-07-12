const env = require("../../.env")


export const callGeocodingApi = async (textInput) => {
  

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${textInput}.json?country=gb&limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${env.mapbox_access_token}`;

   const response = await fetch(url, {
    method: "GET",
  })
  const body = await response.json()
  const coordinates = `${body.features[0].center[1]},${body.features[0].center[0]}`
  // console.log(coordinates);
  return coordinates;
};


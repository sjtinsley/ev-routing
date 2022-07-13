const env = require("../../../.env")

const getLocations = async (callHereOutput) => {
  
  const pois = []
  const waypoints = callHereOutput.split(`%3B`);
  const urls = waypoints.map((waypoint) => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${env.google_api_key}&location=${waypoint}&radius=1500`
  })

  const allPromise = Promise.all(urls.map(url =>
    fetch(url).then(response => {
      return response.json()
    })
  ))

  const data = await allPromise;

  data.forEach((waypoint) => {
    waypoint.results.forEach((poi) => {
      let destinations = []
      destinations.push({
        name: poi.name,
        location: poi.geometry.location,
        rating: poi.rating
      })
      pois.push(destinations)
    })
  });
  return(pois);
}

module.exports = getLocations;

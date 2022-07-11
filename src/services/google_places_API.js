const env = require("../../.env")

export const pois = []

const getPois = async (callHereOutput) => {
  
  const waypoints = callHereOutput.split(`%3B`);
  const urls = waypoints.map((waypoint) => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${env.google_api_key}&location=${waypoint}&radius=1500`
  })

  Promise.all(urls.map(url =>
    fetch(url).then(response => {
      return response.json()
    })
    )).then(data => {
      data.forEach((place) => {
        let destinations = []
        place.results.forEach((poi) => {
          destinations.push({
            name: poi.name,
            location: poi.geometry.location,
            rating: poi.rating
          })
          pois.push(destinations)
        })
      });
      console.log(pois);
  })
}

getPois("51.80636635113677%2C-0.3465737695457438%3B51.82465490329337%2C-0.3675335170844881");

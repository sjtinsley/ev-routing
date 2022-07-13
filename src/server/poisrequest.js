const env = require("../../.env")

const getPois = async (callHereOutput) => {
  
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

  // console.log(data[0].results);
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

  console.log(pois);
  return(pois[0]);
}

const output = getPois("51.75551886387588,-0.26710535612281244%3B55.41634003991329,-1.7109630298352374");

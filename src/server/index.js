const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

const env = require("../../.env")

const pois = []

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
      console.log(pois[0]);
      return(pois);
  })
}

router.get('/', (ctx, next) => {
  const data = getPois("51.80636635113677%2C-0.3465737695457438%3B51.82465490329337%2C-0.3675335170844881");
	ctx.body = data;
	next();
});

app.use(serve('dist'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3030, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));

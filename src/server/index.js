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
      console.log(data.length)
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
      console.log(pois.length);
      return(pois[0]);
  })
}

getPois("51.75551886387588,-0.26710535612281244");

router.get('/', (ctx, next) => {
	ctx.body = pois;
	next();
});

app.use(serve('dist'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3030, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));

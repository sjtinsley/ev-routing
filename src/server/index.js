const getLocations = require('./model/getLocations');
const reverseCoordinates = require('./model/reverseCoordinates')

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
var cors = require('@koa/cors');

const app = new Koa();
app.use(cors());
const router = new Router();

router.get('/', async (ctx, next) => {
  let input = reverseCoordinates(ctx.request.url);
	ctx.body = await getLocations(input);
	next();
});

app.use(serve('dist'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3030, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));

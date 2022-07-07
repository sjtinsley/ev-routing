const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const callHereApi = require('../services/here_API');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');


const app = new Koa();
const router = new Router();

router.post('/getevroute', async (ctx, next) => {
  console.log('HELLLLOOOOOO');
  callApi(ctx.request.params.origin,ctx.request.params.destination)
  await next();
  console.log(ctx.body)
});

app.use(cors());
app.use(bodyParser());
app.use(serve('dist'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3030, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));

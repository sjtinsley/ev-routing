const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const callHereApi = require('../services/here_API');

const app = new Koa();
const router = new Router();

app.use(serve('dist'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3030, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));

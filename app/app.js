const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

app.use(async ctx => {
  ctx.body = ctx.request.body;
});

app.listen(3000);
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const serve = require('koa-static');
const { initRoute } = require('./app/routes/index.js');
const error = require('./middlewares/exception');
const { port } = require('./config/config.js');
app.use(bodyParser());
app.use(error);
parameter(app);
initRoute(app);
if (process.env.NODE_ENV === 'development') {
  app.use(serve(path.join(__dirname, './public/apidoc')));
}
app.listen(port, () => {
  console.log(`app listen http://localhost:${port}`);
});

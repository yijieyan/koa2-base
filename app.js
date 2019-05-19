const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const exception = require('./middlewares/exception.js');


const InitManager = require('./core/init.js');

app.use(exception);
InitManager.initCore(app);

app.use(bodyParser());
app.listen(3000);
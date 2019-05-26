const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const exception = require("./middlewares/exception.js");

app.use(bodyParser());
const InitManager = require("./core/init.js");

app.use(exception);
InitManager.initCore(app);


app.listen(3000);
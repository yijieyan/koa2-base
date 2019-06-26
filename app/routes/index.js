const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

function initRoute (app) {
  fs.readdirSync(path.resolve(__dirname)).forEach(file => {
    let router = require(`./${file}`);
    if (router instanceof Router) {
      app.use(router.routes()).use(router.allowedMethods());
    }
  });
}

module.exports = {
  initRoute
};

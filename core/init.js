const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore (app) {
    InitManager.app = app;
    InitManager.initLoadRouter();
  }

  static initLoadRouter () {
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, {
      visit: function (obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes());
        }
      }
    });
  }
}

module.exports = InitManager;

const express = require(`express`);
const path = require(`path`);

const VARIABLES = require(`../until/variable`);
const productStore = require(`./router/store/product-store`);
const productRoute = require(`./router/router`)(productStore);

const STATIC_DIR = path.join(process.cwd(), `static`);

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(VARIABLES.STATUS_CODE.NOT_FOUND).send(`Page was not found`);
};
const generateStringError = (err) => `${err.code} ${err.name} ${err.message}`;
const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || VARIABLES.STATUS_CODE.INTERNAL_SERVER_ERROR).send(generateStringError(err));
  }
};

class LocalServer {
  constructor(port) {
    this.port = port;
    this.host = VARIABLES.SERVER_HOST;
    this.app = express();
  }

  start() {
    this.init();
    this.app.listen(this.port, this.host, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Local server is running at http://${this.host}:${this.port}`);
    });
  }

  init() {
    this.app.use(express.static(STATIC_DIR));
    this.app.use(`/api/product`, productRoute);
    this.app.use(NOT_FOUND_HANDLER);
    this.app.use(ERROR_HANDLER);
  }
}

module.exports = {
  LocalServer,
  ERROR_HANDLER,
  NOT_FOUND_HANDLER
};

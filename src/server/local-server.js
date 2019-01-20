const express = require(`express`);
const path = require(`path`);

const VARIABLES = require(`../until/variable`);
const productStore = require(`./router/store/product-store`);
const productRoute = require(`./router/router`)(productStore);
const app = express();

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

app.use(express.static(STATIC_DIR));
app.use(`/api/product`, productRoute);
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
  app
};
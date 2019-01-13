const {Router} = require(`express`);

const {BadRequest} = require(`../error/errors`);
const asyncMidleware = require(`../../until/async`);
const validator = require(`../../until/validator`);

const productRouter = new Router();

productRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const toPage = async (cursor, skip, limit) => {
  const countProduct = await cursor.count();
  if (skip > countProduct) {
    throw new BadRequest(`Invalid skip value -- ${skip} - is biggest then count offers in database -- ${countProduct}`);
  }
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: countProduct
  };
};
productRouter.get(``, asyncMidleware(async (req, res) => {
  const {skip = 0, limit = 30} = req.query;
  const limitNumber = Number(limit);
  const skipNumber = Number(skip);
  if (!validator.getInteger(skipNumber)) {
    throw new BadRequest(`Invalid skip value -- ${skip} - is not number`);
  }
  if (!(validator.getInteger(limitNumber))) {
    throw new BadRequest(`Invalid limit value -- ${limit} - is not number`);
  }
  const productToSend = await toPage(await productRouter.productStore.get(), skipNumber, limitNumber);
  res.send(productToSend);
}));

module.exports = (productStore) => {
  productRouter.productStore = productStore;
  return productRouter;
};

const Cursor = require(`./cursor`);
const data = require(`../../../data/data`);

const setupCollection = async () => {
  const productData = await data;
  return productData;
};
class ProductStore {
  constructor(data) {
    this.data = data;
  }
  async get() {
    return new Cursor(await (this.data));
  }
}
module.exports = new ProductStore(setupCollection());
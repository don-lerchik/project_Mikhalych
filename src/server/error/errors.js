class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
    this.name = `Not Found`;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
    this.name = `Bad Request`;
  }
}
module.exports = {
  NotFoundError,
  BadRequest
};

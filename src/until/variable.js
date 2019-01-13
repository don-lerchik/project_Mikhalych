const VARIABLES = {
    SUCCESS_EXIT_CODE: 0,
    FAILURE_EXIT_CODE: 1,
    POSITIVE_ANSWER: `y`,
    NEGATIVE_ANSWER: `n`,
    OFFERS_DATA_SKIP: 0,
    OFFERS_DATA_LIMIT: 20,
    FILE_WRITE_OPTION: {encoding: `utf-8`, mode: 0o644},
    SERVER_PORT: 3000,
    SERVER_HOST: `127.0.0.1`,
    STATUS_CODE: {
      OK: 200,
      NOT_FOUND: 404,
      BAD_REQUEST: 400,
      INTERNAL_SERVER_ERROR: 500
    }
  };
  
  module.exports = VARIABLES;
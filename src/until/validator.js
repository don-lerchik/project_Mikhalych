const VARIABLES = require(`./variable`);

const ValidatorAnswer = {
  getBoolAnswer(answer) {
    return (answer === VARIABLES.POSITIVE_ANSWER) || (answer === VARIABLES.NEGATIVE_ANSWER);
  },

  getInteger(answer) {
    return (!isNaN(answer) && (Number.isInteger(+answer)) && (answer >= 0));
  }
};

module.exports = ValidatorAnswer;

const server = require(`./commands/server`);
const help = require(`./commands/help`);
const VARIABLES = require(`./until/variable`);

const COMMAND_ID = {
  '--help': help,
  '--server': server
};
class Initilization {
  constructor(inputCommand) {
    this.inputCommand = inputCommand;
  }

  _greetingMessage() {
    return console.log(`Hi user!\nThis program will start the server`);
  }

  _errorMessage() {
    return console.log(`Unknown command ${this.inputCommand}`);
  }

  async init() {
    if (!this.inputCommand) {
      this._greetingMessage();
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
    if (COMMAND_ID[this.inputCommand] === COMMAND_ID[`--server`]) {
      COMMAND_ID[this.inputCommand].execute();
    }
    if (COMMAND_ID[this.inputCommand]) {
      await COMMAND_ID[this.inputCommand].execute();
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
    this._errorMessage();
    COMMAND_ID[`--help`].execute();
    return process.exit(VARIABLES.FAILURE_EXIT_CODE);
  }
}

module.exports = Initilization;


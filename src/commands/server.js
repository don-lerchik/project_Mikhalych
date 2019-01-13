const AbstractCommand = require(`./abstract-commands`);
const ask = require(`../until/ask`);
const ValidatorAnswer = require(`../until/validator`);
const VARIABLES = require(`../until/variable`);

const {LocalServer} = require(`../server/local-server`);

class Server extends AbstractCommand {
  async execute() {
    const port = await this.beforeStart();
    const localServer = new LocalServer(port);
    localServer.start();
  }

  async beforeStart() {
    const userAnswer = await ask(`Now the server will be running on port ${VARIABLES.SERVER_PORT}.\nDo you want to change the port ? (y/n) \n`, ValidatorAnswer.getBoolAnswer);
    if (userAnswer === VARIABLES.POSITIVE_ANSWER) {
      const userServerPort = await ask(`Please enter port (number)\n`, ValidatorAnswer.getIneger);
      return userServerPort;
    }
    return VARIABLES.SERVER_PORT;
  }
}

module.exports = new Server(`server`, `run local server`);
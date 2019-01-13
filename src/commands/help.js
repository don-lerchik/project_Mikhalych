const AbsctractCommand = require(`./abstract-commands`);
const server = require(`./server`);

class Help extends AbsctractCommand {
  constructor(name, descrp, commands) {
    super(name, descrp);
    this.commands = commands;
  }
  execute() {
    return console.log(this.helpOutput());
  }

  helpOutput() {
    const commandsList = this.commands.map((command) => `--${command.name} - ${command.description}`).join(`\n`);
    return `Available commands\n--help - Shows available commands\n${commandsList}`;
  }
}

module.exports = new Help(`help`, `Shows available commands`, [server]);
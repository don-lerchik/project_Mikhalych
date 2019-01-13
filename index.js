const Initialization = require(`./src/init`);
const command = process.argv[2];

const initialization = new Initialization(command);
initialization.init();
  
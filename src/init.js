const server = require(`./server/local-server`);

const args = process.argv.slice(2);

if (args.length === 0) {
  server.run();
} else {
  const command = args[0];
  console.error(`Unknown command: "${command}`);
  process.exit(1);
}


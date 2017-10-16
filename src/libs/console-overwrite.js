const consoleOverwrite = (message) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
};

module.exports = consoleOverwrite;

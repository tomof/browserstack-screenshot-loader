#!/usr/bin/env node
const program = require('commander');
const chalk   = require('chalk');

const version    = require('../../package.json').version;
const credential = require('../libs/credential');
const run        = require('./run');

program
  .version(version)
  .option('-s, --session-id [id]', 'Session id to download screenshot')
  .option('-d, --outdir [path]', 'Specify directory where download screenshots', '/tmp/screenshots');

program.on('--help', () => {
  console.log('');
  console.log('  * Required Settings:');
  console.log('');
  console.log('    $ export BROWSERSTACK_USERNAME=<username>');
  console.log('    $ export BROWSERSTACK_ACCESS_KEY=<access_key>');
  console.log('');
});

program.parse(process.argv);

if(!credential.username || !credential.password){
  program.outputHelp();
  console.error(chalk.rgb(0,0,0).bgRed('Please set BrowserStack account settings!'));
  process.exit(1);
}

const targetSessionId = program.sessionId;
const outdir          = program.outdir.slice(-1) === '/'
  ? program.outdir
  : program.outdir + '/';

run(targetSessionId, outdir);

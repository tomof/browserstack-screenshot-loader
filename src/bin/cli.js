#!/usr/bin/env node
const program = require('commander');
const chalk   = require('chalk');

const version    = require('../../package.json').version;
const credential = require('../libs/credential');
const run        = require('./run');

program
  .version(version)
  .option('-b, --begin [index]', 'Zero-based index at which to begin select sessions.', 0)
  .option('-d, --outdir [path]', 'Specify directory where download screenshots.', '/tmp/screenshots');

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

const begin  = program.begin;
const outdir = program.outdir.slice(-1) === '/'
  ? program.outdir
  : program.outdir + '/';

run(outdir, begin);

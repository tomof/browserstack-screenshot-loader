require("babel-core/register");
require("babel-polyfill");

const chalk = require('chalk');
const emoji = require('node-emoji');

const constants             = require('../libs/constants');
const genRequestOptions     = require('../libs/gen-request-options');
const getApi                = require('../libs/requests/get-api');
const getLatestBuildId      = require('../libs/requests/get-latest-build-id');
const getLatestSessionId    = require('../libs/requests/get-latest-session-id');
const getSessionLogsUrl     = require('../libs/requests/get-session-logs-url');
const getSessionLogs        = require('../libs/requests/get-session-logs');
const extractScreenShotUrls = require('../libs/parsers/extract-screenshot-urls');
const loadScreenshots       = require('../libs/loaders/load-screenshots');

const getSessionId = async (sessionOptions, targetSessionId) => {
  if(targetSessionId){
    return targetSessionId;
  }
  const sessions = await getApi(sessionOptions);
  return getLatestSessionId(sessions);
};

const run = async (targetSessionId, outdir) => {
  const buildOptions   = genRequestOptions(constants.API_PATHS.build);
  const builds         = await getApi(buildOptions);
  const buildId        = getLatestBuildId(builds);

  const sessionOptions = genRequestOptions(constants.API_PATHS.sessions.replace('<build-id>', buildId));
  const sessionId      = await getSessionId(sessionOptions, targetSessionId);

  const sessionLogsUrl = await getSessionLogsUrl(buildId, sessionId);
  const sessionLogs    = await getSessionLogs(sessionLogsUrl);
  const screenShotUrls = extractScreenShotUrls(sessionLogs);

  const latestMark     = targetSessionId
    ? ''
    : chalk.yellow('(Latest)')
  ;

  console.log(chalk.green('  Build ID:'), buildId);
  console.log(chalk.green('Session ID:'), sessionId, latestMark);
  await loadScreenshots(screenShotUrls, outdir);
  if(screenShotUrls.length === 0){
    console.log(chalk.rgb(0, 0, 0).bgYellow.bold('This session has no screenshot!'));
  }
  console.log(emoji.emojify(':rabbit::sparkles: Done!'));
};

module.exports = run;

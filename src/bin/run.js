require("babel-core/register");
require("babel-polyfill");

const chalk = require('chalk');
const emoji = require('node-emoji');

const constants             = require('../libs/constants');
const genRequestOptions     = require('../libs/gen-request-options');
const genSessionDirName     = require('../libs/gen-session-dir-name');
const getApi                = require('../libs/requests/get-api');
const getLatestBuildId      = require('../libs/requests/get-latest-build-id');
const getLatestSessionIds   = require('../libs/requests/get-latest-session-ids');
const getSessionInfo        = require('../libs/requests/get-session-info');
const getSessionLogs        = require('../libs/requests/get-session-logs');
const extractScreenShotUrls = require('../libs/parsers/extract-screenshot-urls');
const loadScreenshots       = require('../libs/loaders/load-screenshots');

const getSessionIds = async (sessionOptions, begin) => {
  const sessions = await getApi(sessionOptions);
  return getLatestSessionIds(sessions.slice(begin));
};

const run = async (outdir, begin) => {
  const buildOptions   = genRequestOptions(constants.API_PATHS.build);
  const builds         = await getApi(buildOptions);
  const buildId        = getLatestBuildId(builds);
  console.log(chalk.green('  Build ID:'), buildId);

  const sessionOptions = genRequestOptions(constants.API_PATHS.sessions.replace('<build-id>', buildId));
  const sessionIds     = await getSessionIds(sessionOptions, begin);

  for (const sessionId of sessionIds) {
    const [
      sessionLogsUrl,
      sessionOsName,
      sessionOsVersion,
      sessionBrowserName,
      sessionBrowserVersion
    ] = await getSessionInfo(buildId, sessionId);
    const sessionLogs    = await getSessionLogs(sessionLogsUrl);
    const screenShotUrls = extractScreenShotUrls(sessionLogs);
    const sessionDirName = genSessionDirName(sessionOsName, sessionOsVersion, sessionBrowserName, sessionBrowserVersion);
    const sessionOutDir  = `${outdir}${sessionDirName}/`;
    const latestMark     = begin === 0 ? '' : chalk.yellow('(Latest)');

    console.log(chalk.green('Session ID:'), sessionId, latestMark);
    console.log(chalk.green('Output Dir:'), sessionOutDir);
    await loadScreenshots(screenShotUrls, sessionOutDir);
    if(screenShotUrls.length === 0){
      console.log(chalk.rgb(0, 0, 0).bgYellow.bold('This session has no screenshot!'));
    }
  }
  console.log(emoji.emojify(':rabbit::sparkles: Done!'));
};

module.exports = run;

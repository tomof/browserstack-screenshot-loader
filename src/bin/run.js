require("babel-core/register");
require("babel-polyfill");

const chalk   = require('chalk');

const getLatestBuildId      = require('../libs/requests/get-latest-build-id');
const getLatestSessionId    = require('../libs/requests/get-latest-session-id');
const getSessionLogsUrl     = require('../libs/requests/get-session-logs-url');
const getSessionLogs        = require('../libs/requests/get-session-logs');
const extractScreenShotUrls = require('../libs/parsers/extract-screenshot-urls');
const loadScreenshots       = require('../libs/loaders/load-screenshots');

const run = async (targetSessionId, outdir) => {
  const buildId        = await getLatestBuildId();
  const sessionId      = targetSessionId ? targetSessionId : await getLatestSessionId(buildId);
  const sessionLogsUrl = await getSessionLogsUrl(buildId, sessionId);
  const sessionLogs    = await getSessionLogs(sessionLogsUrl);
  const screenShotUrls = extractScreenShotUrls(sessionLogs);

  if(!targetSessionId) {
    console.log(chalk.yellow('target is latest session!'));
  }
  console.log(chalk.green('[Build   ID] '), buildId);
  console.log(chalk.green('[Session ID] '), sessionId);
  await loadScreenshots(screenShotUrls, outdir);
  console.log('Done!!!!!!!!');
};

module.exports = run;

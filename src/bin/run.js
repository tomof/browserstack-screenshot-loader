require("babel-core/register");
require("babel-polyfill");

const chalk   = require('chalk');

const getCurrentBuildId     = require('../libs/requests/get-current-build-id');
const getCurrentSessionId   = require('../libs/requests/get-current-session-id');
const getSessionLogsUrl     = require('../libs/requests/get-session-logs-url');
const getSessionLogs        = require('../libs/requests/get-session-logs');
const extractScreenShotUrls = require('../libs/parsers/extract-screenshot-urls');
const loadScreenshots       = require('../libs/loaders/load-screenshots');

const run = async (targetSessionId, outdir) => {
  const buildId        = await getCurrentBuildId();
  const sessionId      = targetSessionId ? targetSessionId : await getCurrentSessionId(buildId);
  const sessionLogsUrl = await getSessionLogsUrl(buildId, sessionId);
  const sessionLogs    = await getSessionLogs(sessionLogsUrl);
  const screenShotUrls = extractScreenShotUrls(sessionLogs);

  if(!targetSessionId) {
    console.log(chalk.yellow('target is latest session!'));
  }
  console.log(chalk.green('[Build   ID] '), buildId);
  console.log(chalk.green('[Session ID] '), sessionId);

  loadScreenshots(screenShotUrls, outdir);
};

module.exports = run;

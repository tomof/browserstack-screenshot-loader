const matchNewline          = new RegExp('\\r\\n|\\r|\\n');
const matchScreenshotLine   = new RegExp('^.+screenshot-selenium-.+\\.png.+$');
const extractScreenshotJson = new RegExp('RESPONSE (\\{.+\\})$');

const extractScreenShotUrls = (sessionLogs) => {
  const urls = [];

  sessionLogs.split(matchNewline).forEach(line => {
    if(line.search(matchScreenshotLine) < 0){
      return;
    }
    const matchedScreenshotJson = line.match(extractScreenshotJson);
    if(!matchedScreenshotJson){
      return;
    }
    const screenshotUrl = JSON.parse(matchedScreenshotJson[1]).value;
    urls.push(screenshotUrl);
  });

  return urls;
};

module.exports = extractScreenShotUrls;

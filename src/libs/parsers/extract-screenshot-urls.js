const matchNewline            = new RegExp('\\r\\n|\\r|\\n');
const matchScreenshotSelenium = new RegExp('^.+screenshot-selenium-.+\\.png.+$');
const extractScreenshotJson   = new RegExp('RESPONSE (\\{.+\\})$');

const extractScreenShotUrls = (sessionLogs) => {
  const urls = [];

  sessionLogs.split(matchNewline).forEach(line => {
    if(line.search(matchScreenshotSelenium) < 0){
      return false;
    }
    const jsonString = line.match(extractScreenshotJson)[1];
    const jsonObj    = JSON.parse(jsonString);
    urls.push(jsonObj.value);
  });

  return urls;
};

module.exports = extractScreenShotUrls;

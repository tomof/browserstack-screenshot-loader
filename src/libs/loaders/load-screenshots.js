const fs      = require('fs');
const request = require('request');

const paddingZero = (val) => {
  const length = 4;
  const pad    = new Array(1 + length).join('0');
  return (pad + val).slice(-pad.length);
};

const loadUrlImage = (imageUrl, filename) => {
  request(imageUrl)
    .on('error', (err) => {
      console.error(`Failed download ${filename}`);
      throw new Error(err);
    })
    .pipe(fs.createWriteStream(filename))
    .on('close', () => {
      console.log(`Done download ${filename}`);
    });
};

const loadScreenshots = (screenShotUrls, outdir) => {
  screenShotUrls.forEach((url, index) => {
    const fileNo = paddingZero(index);
    loadUrlImage(url, `${outdir}${fileNo}.png`);
  });
};

module.exports = loadScreenshots;

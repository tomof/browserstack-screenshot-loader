const fs          = require('fs');
const request     = require('request');
const ProgressBar = require('progress');
const chalk       = require('chalk');

const paddingLength    = 4;
const progressBarWidth = 40;

const paddingZero = (val) => {
  const length = paddingLength;
  const pad    = new Array(1 + length).join('0');
  return (pad + val).slice(-pad.length);
};

const loadUrlImage = (imageUrl, filename, progressBar) => {
  return new Promise((resolve, reject) => {
    request(imageUrl)
      .on('error', (error) => {
        console.error(chalk.red(error.stack));
        reject(filename);
      })
      .pipe(fs.createWriteStream(filename))
      .on('close', () => {
        progressBar.tick(1);
        resolve(filename);
      });
  });
};

const loadScreenshots = async (screenShotUrls, outdir) => {
  const loadPromises = [];
  const progressBar  = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
    incomplete: ' ',
    width:      progressBarWidth,
    total:      screenShotUrls.length
  });

  screenShotUrls.forEach((url, index) => {
    const fileNo = paddingZero(index);
    loadPromises.push(loadUrlImage(url, `${outdir}${fileNo}.png`, progressBar));
  });
  return new Promise((resolve) => {
    Promise.all(loadPromises)
      .then(filenames => {
        resolve(filenames);
      })
      .catch(filename => {
        console.error(chalk.red.bold(`Failed ${filename} download!`));
      });
    });
};

module.exports = loadScreenshots;

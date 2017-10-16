const fs          = require('fs');
const rimraf      = require('rimraf');
const mkdirp      = require('mkdirp');
const request     = require('request');
const ProgressBar = require('progress');
const chalk       = require('chalk');
const emoji       = require('node-emoji');

const paddingLength    = 4;
const progressBarWidth = 40;

const paddingZero = (val) => {
  const pad = new Array(1 + paddingLength).join('0');
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

const loadScreenshots = async (screenShotUrls, outputDir) => {
  const loadPromises = [];
  const progressBar  = new ProgressBar(emoji.emojify(':truck: downloading [:bar] :rate/bps :percent :etas'), {
    incomplete: ' ',
    width:      progressBarWidth,
    total:      screenShotUrls.length
  });

  // ダウンロード先のディレクトリを空の状態で用意
  rimraf.sync(outputDir);
  mkdirp.sync(outputDir);

  screenShotUrls.forEach((url, index) => {
    const fileNo = paddingZero(index);
    loadPromises.push(loadUrlImage(url, `${outputDir}${fileNo}.png`, progressBar));
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

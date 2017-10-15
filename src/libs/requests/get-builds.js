const requestPromise = require('request-promise');

const genRequestOptions = require('../gen-request-options');

const path = '/automate/builds.json';

const getBuilds = async () => {
  const options = genRequestOptions(path);
  return new Promise((resolve, reject) => {
    requestPromise(options)
      .then(builds => {
        resolve(builds);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = getBuilds;

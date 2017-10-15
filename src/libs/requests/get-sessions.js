const requestPromise = require('request-promise');

const genRequestOptions = require('../gen-request-options');

const path = '/automate/builds/<build-id>/sessions.json';

const getSessions = async (buildId) => {
  const options = genRequestOptions(path.replace('<build-id>', buildId));
  return new Promise((resolve, reject) => {
    requestPromise(options)
      .then(sessions => {
        resolve(sessions);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = getSessions;

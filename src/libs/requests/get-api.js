const requestPromise = require('request-promise');

const getApi = async (options) => {
  return new Promise((resolve, reject) => {
    requestPromise(options)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = getApi;

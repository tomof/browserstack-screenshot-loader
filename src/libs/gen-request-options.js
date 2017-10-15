const credential = require('./credential');

const host = 'https://www.browserstack.com';
const auth = 'Basic ' + new Buffer(credential.username + ':' + credential.password).toString('base64');

const genRequestOptions = (path, override = {}) => {
  const defaultOption = {
    uri: `${host}${path}`,
    headers: {
      'Authorization': auth
    },
    json: true
  };
  return Object.assign({}, defaultOption, override);
};

module.exports = genRequestOptions;

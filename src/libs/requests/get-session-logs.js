const exec = require('child_process').exec;

const credential = require('../credential');

const getSessionLogs = async (logsUrl) => {
  const command = `curl -u "${credential.username}:${credential.password}" ${logsUrl}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      resolve(stdout);
      if (error !== null) {
        reject(error);
      }
    });
  });
};

module.exports = getSessionLogs;

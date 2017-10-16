const genSessionDirName = (
  osName,
  osVersion,
  browserName,
  browserVersion
) => {
  const symbolReg = new RegExp(/[^A-Za-z0-9]/g);
  return `${osName}-${osVersion}-${browserName}-${browserVersion}`.replace(symbolReg, '-');
};

module.exports = genSessionDirName;

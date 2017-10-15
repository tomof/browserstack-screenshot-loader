const getBuilds = require('./get-builds');

const getCurrentBuildId = async () => {
  const builds = await getBuilds();
  // TODO: assert
  return builds[0].automation_build.hashed_id;
};

module.exports = getCurrentBuildId;

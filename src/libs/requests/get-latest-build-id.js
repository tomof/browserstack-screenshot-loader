const getLatestBuildId = (builds) => {
  // TODO: assert
  return builds[0].automation_build.hashed_id;
};

module.exports = getLatestBuildId;

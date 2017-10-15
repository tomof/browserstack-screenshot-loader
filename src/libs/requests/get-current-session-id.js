const getSessions = require('./get-sessions');

const getCurrentSessionId = async (buildId) => {
  const sessions = await getSessions(buildId);
  // TODO: assert
  return sessions[0].automation_session.hashed_id;
};

module.exports = getCurrentSessionId;

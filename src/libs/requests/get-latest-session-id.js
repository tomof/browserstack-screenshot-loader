const getLatestSessionId = (sessions) => {
  // TODO: assert
  return sessions[0].automation_session.hashed_id;
};

module.exports = getLatestSessionId;

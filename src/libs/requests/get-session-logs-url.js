const getSessions = require('./get-sessions');

const getSessionLogsUrl = async (buildId, sessionId) => {
  const sessions = await getSessions(buildId);
  const targetSession = sessions.find(session => {
    // TODO: assert
    return session.automation_session.hashed_id === sessionId;
  });
  return targetSession.automation_session.logs;
};

module.exports = getSessionLogsUrl;

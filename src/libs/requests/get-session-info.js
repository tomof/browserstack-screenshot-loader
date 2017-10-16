const getSessions = require('./get-sessions');

const getSessionInfo = async (buildId, sessionId) => {
  const sessions = await getSessions(buildId);
  const targetSession = sessions.find(session => {
    // TODO: assert
    return session.automation_session.hashed_id === sessionId;
  }).automation_session;
  return [
    targetSession.logs,
    targetSession.os,
    targetSession.os_version,
    targetSession.browser,
    targetSession.browser_version
  ];
};

module.exports = getSessionInfo;

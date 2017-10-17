const isSameSessionStruct = (sessionA, sessionB) => {
  return (
    sessionA.automation_session.os              === sessionB.automation_session.os              &&
    sessionA.automation_session.os_version      === sessionB.automation_session.os_version      &&
    sessionA.automation_session.browser         === sessionB.automation_session.browser         &&
    sessionA.automation_session.browser_version === sessionB.automation_session.browser_version
  );
};

const getLatestSessionIds = (sessions) => {
  // TODO: assert
  const latestSessions = [];
  for(const session of sessions){
    if(latestSessions.some(latestSession => isSameSessionStruct(session, latestSession))){
      break;
    }
    latestSessions.push(session);
  }
  return latestSessions.map(session => session.automation_session.hashed_id);
};

module.exports = getLatestSessionIds;

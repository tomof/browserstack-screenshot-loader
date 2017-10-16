const getLatestSessionId = require('./get-latest-session-id');
const mockSessions       = [
  {automation_session: {hashed_id: '1a'}},
  {automation_session: {hashed_id: '2b'}},
  {automation_session: {hashed_id: '3c'}},
  {automation_session: {hashed_id: '4d'}},
  {automation_session: {hashed_id: '5e'}},
];

test('最新のセッションIDが正しく取得できる', () => {
  expect(getLatestSessionId(mockSessions)).toBe('1a');
});

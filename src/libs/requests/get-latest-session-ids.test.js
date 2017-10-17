const getLatestSessionIds = require('./get-latest-session-ids');
const mockSessions       = [
  // 最新のセッション
  {automation_session: {hashed_id: '1a', os: 'Mac',     os_version: 'X',  browser: 'Chrome',  browser_version: '60'}},
  {automation_session: {hashed_id: '2b', os: 'Windows', os_version: '10', browser: 'IE',      browser_version: '11'}},
  {automation_session: {hashed_id: '3c', os: 'Mac',     os_version: 'X',  browser: 'Firefox', browser_version: '50'}},
  // 最新以降のセッション
  {automation_session: {hashed_id: '4d', os: 'Mac',     os_version: 'X',  browser: 'Chrome',  browser_version: '60'}},
  {automation_session: {hashed_id: '5e', os: 'Windows', os_version: '10', browser: 'IE',      browser_version: '11'}}
];

test('最新のセッションIDの配列が正しく取得できる', () => {
  expect(getLatestSessionIds(mockSessions)).toEqual(['1a', '2b', '3c']);
});

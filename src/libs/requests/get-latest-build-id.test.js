const getLatestBuildId = require('./get-latest-build-id');
const mockBuilds       = [
  {automation_build: {hashed_id: '1a'}},
  {automation_build: {hashed_id: '2b'}},
  {automation_build: {hashed_id: '3c'}},
  {automation_build: {hashed_id: '4d'}},
  {automation_build: {hashed_id: '5e'}},
];

test('最新のビルドIDが正しく取得できる', () => {
  expect(getLatestBuildId(mockBuilds)).toBe('1a');
});

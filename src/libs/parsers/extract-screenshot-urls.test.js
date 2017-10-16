const extractScreenShotUrls = require('./extract-screenshot-urls');
const mockSessionLogs = `
RESPONSE {"value":"https://example.com/screenshot-selenium-1.png"}
DEBUG    {"value":"https://example.com/screenshot-selenium-2.png"}
RESPONSE {"value":"https://example.com/screenshot-selenium-3.jpeg"}
RESPONSE "value":"https://example.com/screenshot-selenium-4.png"
RESPONSE {"url":"https://example.com/screenshot-selenium-5.png"}
`;

test('スクリーンショットのURLをログから正しく抽出できる', () => {
  const logs = extractScreenShotUrls(mockSessionLogs);
  expect(logs).toContain('https://example.com/screenshot-selenium-1.png');
  expect(logs).not.toContain('https://example.com/screenshot-selenium-2.png');
  expect(logs).not.toContain('https://example.com/screenshot-selenium-3.png');
  expect(logs).not.toContain('https://example.com/screenshot-selenium-4.png');
  expect(logs).not.toContain('https://example.com/screenshot-selenium-5.png');
});

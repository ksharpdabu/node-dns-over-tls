import * as dnstls from './index';

describe('dns-over-tls system tests', () => {
  const domain = 'sagi.io';
  const host = '9.9.9.9';
  const servername = 'dns.quad9.net';

  test('1 arg: domain name', async () => {
    const expected = new Set(['151.101.1.195', '151.101.65.195']);

    const dnsResponse = await dnstls.query(domain);
    const { answers } = dnsResponse;
    answers.forEach(answer => {
      const { data: ip } = answer;
      expect(expected.has(ip)).toBe(true);
    });
    if (!answers) {
      fail();
    }
  });

  test('3 args: host, servername, domain name', async () => {
    const expected = new Set(['151.101.1.195', '151.101.65.195']);

    const dnsResponse = await dnstls.query(host, servername, domain);
    const { answers } = dnsResponse;
    answers.forEach(answer => {
      const { data: ip } = answer;
      expect(expected.has(ip)).toBe(true);
    });
    if (!answers) {
      fail();
    }
  });

  test('options object', async () => {
    const expected = new Set(['151.101.1.195', '151.101.65.195']);

    const dnsResponse = await dnstls.query({ host, servername, name: domain });
    const { answers } = dnsResponse;
    answers.forEach(answer => {
      const { data: ip } = answer;
      expect(expected.has(ip)).toBe(true);
    });
    if (!answers) {
      fail();
    }
  });
});
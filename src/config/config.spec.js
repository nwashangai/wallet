import config from './';

describe('Test config', () => {
  it('should have config data', async () => {
    expect(config.env).toBe('test');
  });
});

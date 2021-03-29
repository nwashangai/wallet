import app from './';

describe('Test app', () => {
  it('should return start object', async () => {
    const appRes = app({
      server: {
        start: jest.fn(),
      },
      dataSource: {
        connect: jest.fn(),
      },
    });
    await appRes.start();
    expect(appRes).toHaveProperty('start');
  });
});

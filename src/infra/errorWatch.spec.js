import erroWatch from './errorWatch';

let watch = erroWatch({
  logger: {
    error: (value) => console.log(value),
  },
});

describe('Test Error handler', () => {
  beforeEach(() => {
    watch = erroWatch({
      logger: {
        error: (value) => console.log(value),
      },
    });
  });

  it('should throw generic error', async () => {
    const callback = () => {
      throw new Error('generic error');
    };
    const resonse = await watch(callback);
    expect(resonse.isSuccessful).toBe(false);
    expect(resonse.statusCode).toBe(500);
    expect(resonse.data.message).toBe('Internal server error');
  });

  it('should throw custom error', async () => {
    const callback = () => {
      throw new Error('{400} custom error');
    };
    const resonse = await watch(callback);
    expect(resonse.isSuccessful).toBe(false);
    expect(resonse.statusCode).toBe(400);
    expect(resonse.data.message).toBe('custom error');
  });

  it('should not throw error', async () => {
    const callback = () => {
      return {
        statusCode: 201,
        data: {
          message: 'success',
        },
      };
    };
    const resonse = await watch(callback);
    expect(resonse.isSuccessful).toBe(true);
    expect(resonse.statusCode).toBe(201);
    expect(resonse.data.message).toBe('success');
  });
});

import codeGenerator from './codeGenerator';

describe('Test codeGenerator', () => {
  const buildGenerator = codeGenerator();
  it('should generate 6 digit random code', () => {
    expect(buildGenerator().length).toBe(6);
  });
});

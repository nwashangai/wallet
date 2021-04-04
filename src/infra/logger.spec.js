import fs from 'fs';
import winston from 'winston';
import logger from './logger';

describe('Test logger Service', () => {
  it('should return witson logger object', () => {
    const writer = logger({ config: { env: 'develop' }, winston, fs });
    expect(writer).toHaveProperty('log');
    expect(writer).toHaveProperty('add');
    expect(writer).toHaveProperty('remove');
    expect(writer).toHaveProperty('close');
    expect(writer).toHaveProperty('error');
    expect(writer).toHaveProperty('info');
  });
});

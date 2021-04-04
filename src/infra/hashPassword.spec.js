import bcrypt from 'bcrypt';
import hashPassword from './hashPassword';

const { hash, isHashMatched } = hashPassword({ bcrypt });

describe('Test hash password', () => {
  it('should hash a given password', () => {
    expect(hash('123456').length).toBeGreaterThan(10);
  });

  it('should return false if hash is invalid for given password', () => {
    expect(isHashMatched('123456', 'dbdfabjgld')).toBe(false);
  });

  it('should return true if hash is valid for given password', () => {
    expect(
      isHashMatched(
        '123456',
        '$2b$10$DkHkUDDHvV0BkTgXSjO/s.TbTO38WCPU6ys/MUc7cpxQVuFY94WKq'
      )
    ).toBe(true);
  });
});

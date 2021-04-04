import jwt from 'jsonwebtoken';
import JWTService from './JWTService';

const jwtService = new JWTService({ config: { authSecret: 'secrete' }, jwt });

describe('Test token Service', () => {
  it('should generate token', () => {
    const token = jwtService.sign({
      id: '1',
      name: 'john doe',
      email: 'johndoe@example.com',
    });
    expect(token.length).toBeGreaterThan(20);
  });

  it('should fail to decode invalid token', () => {
    const decode = jwtService.decode('lkjhgfdsaqwertyuiopzxcvbnnm');
    expect(decode).toBe(null);
  });

  it('should decode token', () => {
    const token = jwtService.sign({
      id: '1',
      name: 'john doe',
      email: 'johndoe@example.com',
    });
    const decode = jwtService.decode(token);
    expect(decode.data).toHaveProperty('id');
    expect(decode.data).toHaveProperty('name');
    expect(decode.data).toHaveProperty('email');
  });

  it('should fail to verify invalid token', () => {
    expect(() => jwtService.verify('lkjhgfdsaqwertyuiopzxcvbnnm')).toThrow(
      'jwt malformed'
    );
  });

  it('should verify valid token', () => {
    const token = jwtService.sign({
      id: '1',
      name: 'john doe',
      email: 'johndoe@example.com',
    });
    const isVerified = jwtService.verify(token);
    expect(!!isVerified).toBe(true);
    expect(isVerified.data).toHaveProperty('id');
    expect(isVerified.data).toHaveProperty('name');
    expect(isVerified.data).toHaveProperty('email');
  });
});

import httpStatus from 'http-status';
import codeGenerator from '../../infra/codeGenerator';
import validation from '../../infra/validation';
import makeFakeRegister from '../../../__test__/fixtures/verification';
import buildVerificationFactory from '.';

let register = buildVerificationFactory(
  validation(),
  codeGenerator,
  httpStatus
);
describe('Test verification Entity', () => {
  beforeEach(() => {
    register = buildVerificationFactory(
      validation(),
      codeGenerator,
      httpStatus
    );
  });

  it('must have a valid email', () => {
    const user = makeFakeRegister({ email: 'john' });
    expect(() => register(user)).toThrow('{400} User must have a valid email');
  });

  it('new user should not have an Id', () => {
    const user = makeFakeRegister({ email: 'johndoe@gmail.com' });
    expect(register(user).getId()).toBe(null);
    expect(register(user).isVerified()).toBe(false);
  });

  it('create valid user verification record', () => {
    const user = makeFakeRegister({
      vid: '1',
      email: 'Johndoe@gmail.com',
      isVerified: true,
    });
    const verification = register(user);
    expect(verification.getId()).toBe('1');
    expect(verification.getCode()).toBe('123456');
    expect(verification.getEmail()).toBe('johndoe@gmail.com');
    register(user);
    expect(verification.isVerified()).toBe(true);
    expect(
      new Date(verification.getCreatedAt()).toUTCString().substring(26)
    ).toBe('GMT');
    expect(
      new Date(verification.getUpdatedAt()).toUTCString().substring(26)
    ).toBe('GMT');
  });
});

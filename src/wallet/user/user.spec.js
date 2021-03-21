import makeFakeUser from '../../../__test__/fixtures/user';
import createUser from './';
describe('user', () => {
  it('must have a name', () => {
    const user = makeFakeUser({ name: null });
    expect(() => createUser(user)).toThrow('User must have a valid name');
  });

  it('must have a valid email', () => {
    const user = makeFakeUser({ email: 'young' });
    expect(() => createUser(user)).toThrow('User must have a valid email');
  });

  it('must have a valid phone with country code', () => {
    const user = makeFakeUser({ phone: '09023456187' });
    expect(() => createUser(user)).toThrow(
      'User must have a valid phone number'
    );
  });

  it('must have a valid nationality if provided', () => {
    const user = makeFakeUser({ nationality: 'ch' });
    expect(() => createUser(user)).toThrow(
      'User must have a valid nationality'
    );
  });

  it('may not have a valid nationality', () => {
    const user = makeFakeUser({ nationality: null });
    expect(() => createUser(user)).toThrow(
      'User must have a valid nationality'
    );
  });

  it('may not have a valid nationality', () => {
    const user = makeFakeUser({ password: '1234' });
    expect(() => createUser(user)).toThrow('User must have a strong password');
  });

  it('is createdAt now in UTC', () => {
    const user = makeFakeUser({});
    const userObj = createUser(user);
    expect(new Date(userObj.getCreatedAt()).toUTCString().substring(26)).toBe(
      'GMT'
    );
  });
});

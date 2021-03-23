import { buildFakeCollection } from '../../../__test__/fixtures/db';
import makeFakeUser from '../../../__test__/fixtures/user';
import buildUserCases from './';
import { hash } from '../../infra/hashPassword';
import validation from '../../infra/validation';

let userCases = buildUserCases(buildFakeCollection('users'));

describe('Test User use cases', () => {
  beforeEach(() => {
    userCases = buildUserCases({
      DB: {
        users: {
          ...buildFakeCollection('users').users,
          findOne: (filter = {}, projection = undefined) => {
            return filter.email === 'johndoe@example.com'
              ? {
                  _id: '1',
                  name: 'john',
                  phone: '123456789',
                }
              : null;
          },
        },
      },
      validator: validation(),
      makeHash: hash,
    });
  });

  it('create new user', async () => {
    const user = makeFakeUser({});
    const newUser = await userCases.createNewUser(user);
    expect(newUser.email).toBe(user.email.toLowerCase());
    expect(newUser.phone).toBe(user.phone);
    expect(newUser.name).toBe(user.name);
    expect(newUser.nationality).toBe(user.country);
  });

  it('must not use already existing email', async () => {
    const user = makeFakeUser({ email: 'johndoe@example.com' });
    await expect(userCases.createNewUser(user)).rejects.toThrow(
      'User email already exist'
    );
  });

  it('update new user data', async () => {
    const user = makeFakeUser({});
    const newUser = await userCases.updateUserInfo('1', user);
    expect(newUser.phone).toBe(user.phone);
    expect(newUser.name).toBe(user.name);
    expect(newUser.nationality).toBe(user.country);
  });

  it('change user password', async () => {
    const newUser = await userCases.updatePassword('1', '123456');
    expect(newUser.uid).toBe('1');
    expect(newUser.password.length).toBeGreaterThan(10);
  });

  it('user must exist to be able to change password', async () => {
    const user = makeFakeUser({ email: 'johndoe@example.com' });
    await expect(userCases.updatePassword(null, user)).rejects.toThrow(
      'User user with Id does not exist'
    );
  });

  it('get Users details', async () => {
    const users = await userCases.getUsers();
    expect(users[0].getEmail()).toBe('johndoe@gmail.com');
    expect(users[0].getName()).toBe('john doe');
  });

  it('get single User detail', async () => {
    const user = await userCases.getUser('1');
    expect(user.getEmail()).toBe('johndoe@gmail.com');
    expect(user.getName()).toBe('john doe');
  });
});

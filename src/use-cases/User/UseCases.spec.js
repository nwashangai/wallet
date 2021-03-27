import { buildFakeCollection } from '../../../__test__/fixtures/db';
import makeFakeUser from '../../../__test__/fixtures/user';
import buildUserCases from '.';
import passwordHash from '../../infra/hashPassword';
import validation from '../../infra/validation';

let userCases = buildUserCases({
  models: {
    users: {
      ...buildFakeCollection('users').users,
      findOne: (filter = {}, projection = undefined) => {
        return filter.email === 'johndoe@example.com'
          ? {
              _doc: {
                _id: '1',
                name: 'john',
                phone: '123456789',
                email: 'johndoe@example.com',
                password: '1234567',
              },
            }
          : null;
      },
    },
  },
  validation: validation(),
  passwordHash: passwordHash(),
});

describe('Test User use cases', () => {
  beforeEach(() => {
    userCases = buildUserCases({
      models: {
        users: {
          ...buildFakeCollection('users'),
          findOne: (filter = {}, projection = undefined) => {
            return filter.email === 'johndoe@example.com' || filter._id === '10'
              ? {
                  _doc: {
                    _id: '10',
                    name: 'john',
                    phone: '+234123456789',
                    email: 'johndoe@example.com',
                    password: '1234567',
                  },
                }
              : null;
          },
        },
      },
      validation: validation(),
      passwordHash: passwordHash(),
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
    const newUser = await userCases.updatePassword('10', '123456');
    expect(newUser.uid).toBe('10');
    expect(newUser.password.length).toBeGreaterThan(10);
  });

  it('user must exist to be able to change password', async () => {
    const user = makeFakeUser({ email: 'johndoe@example.com' });
    await expect(userCases.updatePassword(null, user)).rejects.toThrow(
      'User with Id does not exist'
    );
  });

  it('get Users details', async () => {
    const users = await userCases.getUsers();
    expect(users[0].getEmail()).toBe('johndoe@gmail.com');
    expect(users[0].getName()).toBe('john doe');
  });

  it('get single User detail', async () => {
    const user = await userCases.getUser('10');
    expect(user.getEmail()).toBe('johndoe@example.com');
    expect(user.getName()).toBe('john');
  });

  it('return null if no user with Id exist', async () => {
    const user = await userCases.getUser(null);
    expect(user).toBe(null);
  });
});

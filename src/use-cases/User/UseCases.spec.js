import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
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
              _id: '1',
              name: 'john',
              phone: '123456789',
              email: 'johndoe@example.com',
              password:
                '$2b$10$hl3iSlqcAPg.Tc8f8ggmkuvCh/LMcifsr/1mn3WqCQuLp7Lb8TXE6',
            }
          : null;
      },
    },
  },
  validation: validation(),
  passwordHash: passwordHash({ bcrypt }),
  httpStatus,
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
                  _id: '10',
                  name: 'john',
                  phone: '+234123456789',
                  email: 'johndoe@example.com',
                  password:
                    '$2b$10$hl3iSlqcAPg.Tc8f8ggmkuvCh/LMcifsr/1mn3WqCQuLp7Lb8TXE6',
                }
              : null;
          },
        },
      },
      validation: validation(),
      passwordHash: passwordHash({ bcrypt }),
      httpStatus,
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
      '{409} User email already exist'
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
    expect(newUser._id).toBe('10');
    expect(newUser.password.length).toBeGreaterThan(10);
  });

  it('user must exist to be able to change password', async () => {
    const user = makeFakeUser({ email: 'johndoe@example.com' });
    await expect(userCases.updatePassword(null, user)).rejects.toThrow(
      '{404} User with Id does not exist'
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

  it('must login with valid email', async () => {
    await expect(
      userCases.login('fakeemail@example.com', '1234')
    ).rejects.toThrow('{404} email address does not exist');
  });

  it('must login with valid email and password combination', async () => {
    await expect(
      userCases.login('johndoe@example.com', '1234')
    ).rejects.toThrow('{400} email or password is incorrect');
  });

  it('should login user', async () => {
    const user = await userCases.login('johndoe@example.com', '123456');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('phone');
  });
});

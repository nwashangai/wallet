import jest from 'jest-mock';
import httpStatus from 'http-status';
import { buildFakeCollection } from '../../../__test__/fixtures/db';
import buildVerificationCases from '.';
import validation from '../../infra/validation';

let emailService = {
  sendMail: jest.fn(),
};

let verificationCases = buildVerificationCases({
  models: {
    users: {
      ...buildFakeCollection('users'),
      findOne: (filter = {}, projection = undefined) => {
        return filter.email === 'johndoe@example.com'
          ? {
              _id: '1',
              code: '1234',
              isVerified: false,
            }
          : null;
      },
    },
    verifications: {
      ...buildFakeCollection('verifications'),
      findOne: (filter = {}, projection = undefined) => {
        return filter.email === 'johndoe@example2.com'
          ? {
              _id: '1',
              code: '654321',
              email: 'johndoe@example2.com',
              isVerified: false,
            }
          : null;
      },
    },
  },
  validation: validation(),
  codeGenerator: () => '123456',
  emailService,
  httpStatus,
});

describe('Test Verification use cases', () => {
  beforeEach(() => {
    verificationCases = buildVerificationCases({
      models: {
        users: {
          ...buildFakeCollection('users'),
          findOne: (filter = {}, projection = undefined) => {
            return filter.email === 'johndoe@example.com'
              ? {
                  _id: '1',
                  code: '1234',
                  isVerified: false,
                }
              : null;
          },
        },
        verifications: {
          ...buildFakeCollection('verifications'),
          findOne: (filter = {}, projection = undefined) => {
            return filter.email === 'johndoe@example2.com'
              ? {
                  _id: '1',
                  code: '654321',
                  email: 'johndoe@example2.com',
                  isVerified: false,
                }
              : null;
          },
        },
      },
      validation: validation(),
      codeGenerator: () => '123456',
      emailService,
      httpStatus,
    });
  });

  it('must not use already verified email', async () => {
    await expect(
      verificationCases.startRegistration({ email: 'johndoe@example.com' })
    ).rejects.toThrow('User with email already exist');
  });

  it('send same code if user already exist', async () => {
    await expect(
      verificationCases.startRegistration({
        email: 'johndoe@example2.com',
        code: '777777',
      })
    ).not.toBeUndefined();
  });

  it("send new code if user don't exist", async () => {
    await expect(
      verificationCases.startRegistration({
        email: 'test@example.com',
      })
    ).not.toBeUndefined();
  });

  it('verify user', async () => {
    await expect(
      verificationCases.verify('johndoe@example2.com', '123456')
    ).not.toBe(1);
  });

  it('return false for already verified email', async () => {
    await expect(
      verificationCases.isCodeValid('johndoe@example2.com', '123456')
    ).not.toBe(false);
  });

  it('return true for unverified email', async () => {
    await expect(
      verificationCases.isCodeValid('johndoe@example.com', '123456')
    ).not.toBe(true);
  });
});

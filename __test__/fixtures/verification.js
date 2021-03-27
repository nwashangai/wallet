import faker from 'faker';
import cuid from 'cuid';

export function makeFakeVerify(overrides) {
  const register = {
    email: faker.internet.exampleEmail(),
    id: null,
    code: '123456',
    createdAt: faker.date.recent(),
    createdAt: faker.date.recent(),
  };

  return {
    ...register,
    ...overrides,
  };
}

export default makeFakeVerify;

import faker from 'faker';
import makeFakeDataSource from '../../../__test__/fixtures/db';
import User from './UserRepository.repository';

let user = new User(makeFakeDataSource).build();

describe('Test User Repository', () => {
  beforeEach(() => {
    user = new User(makeFakeDataSource).build();
  });

  it('should create new user', async () => {
    const data = {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    };
    const newData = await user.create(data);
    expect(newData.name).toBe(data.name);
    expect(newData.phone).toBe(data.phone);
  });
});

import faker from 'faker';
import makeFakeDataSource from '../../../__test__/fixtures/db';
import Verify from './Verification.repository';

let register = new Verify(makeFakeDataSource).build();

describe('Test Verification Repository', () => {
  beforeEach(() => {
    register = new Verify(makeFakeDataSource).build();
  });

  it('should create new user', async () => {
    const data = {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    };
    const newData = await register.create(data);
    expect(newData.name).toBe(data.name);
    expect(newData.phone).toBe(data.phone);
  });
});

import faker from 'faker';
import makeDataSource from '../../../__test__/fixtures/db';
import Main from './MainRepository.repository';

let MainRepo = new Main(makeDataSource, 'users');

describe('Test Main Repository', () => {
  beforeEach(() => {
    MainRepo = new Main(makeDataSource, 'users');
  });

  it('should create new user', async () => {
    const data = {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    };
    const newData = await MainRepo.create(data);
    expect(newData.name).toBe(data.name);
    expect(newData.phone).toBe(data.phone);
  });

  it('should find user by Id', async () => {
    const newData = await MainRepo.findById('1');
    expect(newData.id).toBe('1234');
  });

  it('should return empty array if no match', async () => {
    const newData = await MainRepo.findById(null);
    expect(newData).toBe(null);
  });

  it('should find users', async () => {
    const newData = await MainRepo.find({});
    expect(newData[0].id).toBe('1234');
  });

  it('should find first match', async () => {
    const newData = await MainRepo.findOne({});
    expect(newData.id).toBe('1');
    expect(newData.name).toBe('john doe');
  });

  it('should return null if not found', async () => {
    const newData = await MainRepo.findOne(null);
    expect(newData).toBe(null);
  });

  it('should update user data', async () => {
    const data = {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    };
    const result = await MainRepo.updateById('1', data);
    expect(result.id).toBe('1');
    expect(result.name).toBe(data.name);
    expect(result.phone).toBe(data.phone);
  });

  it('should update users data', async () => {
    const result = await MainRepo.updateAll({}, {});
    expect(result.count).toBe(1);
  });

  it('should remove user by Id', async () => {
    const count = await MainRepo.remove('1');
    expect(count).toBe(1);
  });
});

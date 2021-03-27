import faker from 'faker';
import buildValidation from './validation';

let validation = buildValidation();

describe('Test Validation', () => {
  beforeEach(() => {
    validation = buildValidation();
  });

  it('all validations should return false for null or undefined input', () => {
    expect(validation.isValidCountry(null)).toBe(false);
    expect(validation.isValidEmail(null)).toBe(false);
    expect(validation.isValidName(null)).toBe(false);
    expect(validation.isValidPassword(null)).toBe(false);
    expect(validation.isValidPhone(null)).toBe(false);
  });

  it('all validations should return false for invalid input', () => {
    expect(validation.isValidCountry('NG')).toBe(false);
    expect(validation.isValidEmail('john')).toBe(false);
    expect(validation.isValidName('m')).toBe(false);
    expect(validation.isValidPassword('123')).toBe(false);
    expect(validation.isValidPhone('09034529456')).toBe(false);
  });

  it('all validations should return false for invalid input', () => {
    expect(validation.isValidCountry('Nigeria')).toBe(true);
    expect(validation.isValidEmail(faker.internet.exampleEmail())).toBe(true);
    expect(validation.isValidName(faker.name.findName())).toBe(true);
    expect(validation.isValidPassword('123456')).toBe(true);
    expect(
      validation.isValidPhone(faker.phone.phoneNumber('+233#########'))
    ).toBe(true);
  });
});

export default class User {
  constructor({ validator, makeHash }) {
    this.validator = validator;
    this.makeHash = makeHash;
    this.createUser = this.createUser.bind(this);
  }

  createUser({
    id,
    email,
    name,
    phone,
    nationality,
    password,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!this.validator.isValidEmail(email)) {
      throw new Error('User must have a valid email');
    }

    if (!this.validator.isValidName(name)) {
      console.log(name);
      throw new Error('User must have a valid name');
    }

    if (!this.validator.isValidPhone(phone)) {
      throw new Error('User must have a valid phone number');
    }

    if (!nationality || !this.validator.isValidCountry(nationality)) {
      throw new Error('User must have a valid nationality');
    }

    if (!password || !this.validator.isValidPassword(password)) {
      throw new Error('User must have a strong password');
    }

    return Object.freeze({
      getId: () => id || null,
      getEmail: () => email.toLowerCase(),
      getName: () => name.trim(),
      getPhone: () => phone,
      getNationality: () => nationality || null,
      hashPassword: () => this.makeHash(password),
      getPassword: () => password || '',
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
    });
  }
}

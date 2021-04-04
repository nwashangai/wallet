export default class User {
  constructor({ validator, makeHash, isPasswordMatched, httpStatus }) {
    this.validator = validator;
    this.makeHash = makeHash;
    this.httpStatus = httpStatus;
    this.isPasswordMatched = isPasswordMatched;
    this.createUser = this.createUser.bind(this);
    this.roles = ['REGULAR', 'ADMIN', 'SUPER_ADMIN'];
  }

  createUser({
    _id,
    email,
    name,
    phone,
    nationality,
    role,
    lastLogin = new Date(),
    password,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!this.validator.isValidEmail(email)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid email`
      );
    }

    if (!this.validator.isValidName(name)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid name`
      );
    }

    if (!this.validator.isValidPhone(phone)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid phone number`
      );
    }

    if (nationality && !this.validator.isValidCountry(nationality)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid nationality`
      );
    }

    if (password && !this.validator.isValidPassword(password)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a strong password`
      );
    }

    if (role && !this.roles.includes(role || '')) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid role`
      );
    }

    return Object.freeze({
      getId: () => _id || null,
      getEmail: () => email.toLowerCase(),
      getName: () => name.trim(),
      getPhone: () => phone,
      getRole: () => role,
      getNationality: () => nationality || null,
      getLastLogin: () => lastLogin,
      hashPassword: () => {
        if (!this.validator.isValidPassword(password)) {
          throw new Error(
            `{${this.httpStatus.BAD_REQUEST}} User must provide a password`
          );
        }
        return this.makeHash(password);
      },
      isPasswordMatched: (passwordToCompare, hash) =>
        this.isPasswordMatched(passwordToCompare, hash),
      getPassword: () => password || '',
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
    });
  }
}

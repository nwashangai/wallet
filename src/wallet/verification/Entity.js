export default class Verify {
  constructor({ validator, generateCode, httpStatus }) {
    this.validator = validator;
    this.generateCode = generateCode;
    this.httpStatus = httpStatus;
    this.register = this.register.bind(this);
  }

  register({
    vid,
    email,
    code,
    isVerified,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!this.validator.isValidEmail(email)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid email`
      );
    }

    const generatedCode = code || this.generateCode();

    return Object.freeze({
      getId: () => vid || null,
      getEmail: () => email.toLowerCase(),
      isVerified: () => (isVerified ? true : false),
      getCode: () => generatedCode,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
    });
  }
}

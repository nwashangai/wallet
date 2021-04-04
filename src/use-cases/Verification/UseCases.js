import buildVerificationEntityFactory from '../../wallet/verification';

export default class Verification {
  constructor({ validation, codeGenerator, emailService, models, httpStatus }) {
    this.DB = models;
    this.sendMail = emailService.sendMail;
    this.verificationObject = buildVerificationEntityFactory(
      validation,
      codeGenerator,
      httpStatus
    );
    this.startRegistration = this.startRegistration.bind(this);
    this.verify = this.verify.bind(this);
    this.isCodeValid = this.isCodeValid.bind(this);
  }

  build() {
    return {
      startRegistration: this.startRegistration,
      verify: this.verify,
      isCodeValid: this.isCodeValid,
    };
  }

  async startRegistration(registrationInfo) {
    const user = this.verificationObject(registrationInfo);
    const isRegistrationComplete = await this.DB.users.findOne({
      email: user.getEmail(),
    });

    if (isRegistrationComplete) {
      throw new Error('{400} User with email already exist');
    }

    const isRegistrationStarted = await this.DB.verifications.findOne({
      email: user.getEmail(),
    });

    if (isRegistrationStarted) {
      const { _id: vid, ...rest } = isRegistrationStarted;
      const registration = this.verificationObject({
        ...rest,
        vid,
      });
      this.sendMail(
        registration.getEmail(),
        'Verification Code',
        `Your verification code is ${registration.getCode()}`
      );
    } else {
      await this.DB.verifications.create({
        email: user.getEmail(),
        code: user.getCode(),
        isVerified: user.isVerified(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      });

      this.sendMail(
        user.getEmail(),
        'Verification Code',
        `Your verification code is ${user.getCode()}`
      );
    }
  }

  async verify(email) {
    const deletion = await this.DB.verifications.updateOne(
      {
        email: email.toLowerCase(),
      },
      {
        isVerified: true,
      }
    );

    return deletion.count;
  }

  async isCodeValid(email, code) {
    const isVerified = await this.DB.verifications.findOne({
      email: email.toLowerCase(),
      code,
      isVerified: false,
    });

    return !!isVerified;
  }
}

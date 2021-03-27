export default class UserController {
  constructor({ userUseCases, verificationUseCases }) {
    this.users = userUseCases;
    this.verification = verificationUseCases;
    this.startRegistration = this.startRegistration.bind(this);
    this.completeRegistration = this.completeRegistration.bind(this);
  }

  build() {
    return {
      startRegistration: this.startRegistration,
      completeRegistration: this.completeRegistration,
    };
  }

  async startRegistration(request) {
    await this.verification.startRegistration(request.body);
    return {
      statusCode: 201,
      data: {
        message: 'check your for verification code',
      },
    };
  }

  async completeRegistration(request) {
    const { body: payload } = request;

    const isValid = await this.verification.isCodeValid(
      payload.email,
      payload.code
    );

    if (!isValid) throw new Error('{401} invalid code or email');

    await this.users.createNewUser(payload);
    await this.verification.verify(payload.email);

    return {
      statusCode: 201,
      data: {
        message: 'Registration is successful',
      },
    };
  }
}

export default class UserController {
  constructor({ userUseCases, verificationUseCases, httpStatus, jwtService }) {
    this.users = userUseCases;
    this.verification = verificationUseCases;
    this.httpStatus = httpStatus;
    this.jwtService = jwtService;
    this.startRegistration = this.startRegistration.bind(this);
    this.completeRegistration = this.completeRegistration.bind(this);
    this.login = this.login.bind(this);
  }

  // build() {
  //   return {
  //     startRegistration: this.startRegistration,
  //     completeRegistration: this.completeRegistration,
  //     login: this.login,
  //   };
  // }

  async startRegistration(request) {
    await this.verification.startRegistration({ email: request.body.email });
    return {
      statusCode: this.httpStatus.CREATED,
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

    if (!isValid)
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} invalid code or email'`
      );

    await this.users.createNewUser(payload);
    await this.verification.verify(payload.email);

    return {
      statusCode: this.httpStatus.CREATED,
      data: {
        message: 'Registration is successful',
      },
    };
  }

  async login(request) {
    const { body: payload } = request;

    const user = await this.users.login(payload.email, payload.password);

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      lastLogin: user.lastLogin,
      role: user.role,
    });

    return {
      statusCode: this.httpStatus.CREATED,
      data: {
        token,
        userId: user.id,
        email: user.email,
        name: user.name,
        lastLogin: user.lastLogin,
        role: user.role,
      },
    };
  }
}

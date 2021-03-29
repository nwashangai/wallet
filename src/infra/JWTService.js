export default class JWTService {
  #jwtSecret;
  #jwt;

  constructor({ config, jwt }) {
    this.#jwtSecret = config.authSecret;
    this.#jwt = jwt;
  }

  decode(token) {
    var decoded = this.#jwt.decode(token);
    return decoded;
  }

  sign(data) {
    return this.#jwt.sign(
      {
        data,
      },
      this.#jwtSecret,
      { expiresIn: '5h' }
    );
  }

  verify(token) {
    return this.#jwt.verify(token, this.#jwtSecret);
  }
}

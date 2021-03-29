import buildUserEntityFactory from '../../wallet/user';

export default class User {
  constructor({ validation, passwordHash, models, httpStatus }) {
    this.DB = models;
    this.httpStatus = httpStatus;
    this.makeNewUser = buildUserEntityFactory(
      validation,
      passwordHash.hash,
      passwordHash.isHashMatched,
      httpStatus
    );
    this.createNewUser = this.createNewUser.bind(this);
    this.login = this.login.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  build() {
    return {
      createNewUser: this.createNewUser,
      updateUserInfo: this.updateUserInfo,
      getUsers: this.getUsers,
      getUser: this.getUser,
      updatePassword: this.updatePassword,
      login: this.login,
    };
  }

  async createNewUser(userInfo) {
    const user = this.makeNewUser(userInfo);
    const exist = await this.DB.users.findOne({
      email: user.getEmail(),
    });

    if (exist) {
      throw new Error(`{${this.httpStatus.CONFLICT}} User email already exist`);
    }

    return this.DB.users.create({
      email: user.getEmail(),
      name: user.getName(),
      country: user.getNationality(),
      phone: user.getPhone(),
      password: user.hashPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });
  }

  async login(email, password) {
    let user = await this.DB.users.findOne({ email });

    if (!user) {
      throw new Error(
        `{${this.httpStatus.NOT_FOUND}} email address does not exist`
      );
    }

    user = this.makeNewUser(user);

    if (!user.isPasswordMatched(password, user.getPassword())) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} email or password is incorrect`
      );
    }

    this.DB.users.updateOne(
      { _id: user.getId() },
      {
        lastLogin: user.getLastLogin(),
      }
    );

    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      country: user.getNationality(),
      phone: user.getPhone(),
      lastLogin: user.getLastLogin(),
      role: user.getRole(),
    };
  }

  async updateUserInfo(_id, userInfo) {
    const user = this.makeNewUser({ ...userInfo, _id, updatedAt: new Date() });

    return this.DB.users.updateOne(
      { _id: user.getId() },
      {
        name: user.getName(),
        country: user.getNationality(),
        phone: user.getPhone(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      }
    );
  }

  async updatePassword(id, password) {
    const userData = await this.DB.users.findOne({ _id: id });

    if (!userData) {
      throw new Error(
        `{${this.httpStatus.NOT_FOUND}} User with Id does not exist`
      );
    }

    const user = this.makeNewUser({
      _id: userData._id,
      ...userData,
      password,
      updatedAt: new Date(),
    });

    return this.DB.users.updateOne(
      { _id: user.getId() },
      {
        password: user.hashPassword(),
      }
    );
  }

  async getUsers(filter = {}, limit = undefined, start = undefined) {
    return this.DB.users
      .find(filter, {
        limit,
        start,
      })
      .map((user) => this.makeNewUser(user));
  }

  async getUser(id) {
    const user = this.DB.users.findOne({ _id: id });

    return !user ? null : this.makeNewUser(user);
  }
}

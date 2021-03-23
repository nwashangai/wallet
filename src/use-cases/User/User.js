import buildUserEntityFactory from '../../wallet/user';

export default class User {
  constructor({ DB, validator, makeHash }) {
    this.DB = DB;
    this.makeNewUser = buildUserEntityFactory(validator, makeHash);
    this.createNewUser = this.createNewUser.bind(this);
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
    };
  }

  async createNewUser(userInfo) {
    const user = this.makeNewUser(userInfo);
    const exist = await this.DB.users.findOne({
      email: user.getEmail(),
    });

    if (exist) {
      throw new Error('User email already exist');
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

  async updateUserInfo(uid, userInfo) {
    const user = this.makeNewUser({ uid, ...userInfo, updatedAt: new Date() });

    return this.DB.users.updateById(user.getId(), {
      name: user.getName(),
      country: user.getNationality(),
      phone: user.getPhone(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });
  }

  async updatePassword(id, password) {
    const userData = await this.DB.users.findById(id);

    if (!userData) {
      throw new Error('User user with Id does not exist');
    }

    const user = this.makeNewUser({
      ...userData,
      password,
      updatedAt: new Date(),
    });

    return this.DB.users.updateById(user.getId(), {
      password: user.hashPassword(),
    });
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
    const user = this.DB.users.findById(id);

    if (!user) {
      throw new Error('User user with Id does not exist');
    }

    return this.makeNewUser(user);
  }
}

import newUser from '../../wallet/user';

export default class User {
  constructor(DB) {
    this.DB = DB;
    this.createNewUser = this.createNewUser.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    // this.createUser = this.createUser.bind(this);
  }

  build() {
    return {
      createNewUser = this.createNewUser,
      updateUserInfo = this.updateUserInfo,
      getUsers = this.getUsers,
      getUser = this.getUser,
    };
  }

  async createNewUser(userInfo) {
    const user = newUser(userInfo);
    esxist = await DB.user.findOne({
      where: {
        email: user.getEmail(),
      },
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

  async updateUserInfo(userInfo) {
    const user = newUser({ ...userInfo, updatedAt: new Date() });

    return this.DB.users.updateById(user.getId(), {
      name: user.getName(),
      country: user.getNationality(),
      phone: user.getPhone(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });
  }

  async getUsers(filter = {}, limit = undefined, start = undefined) {
    return this.DB.users
      .find(filter, {
        limit,
        start,
      })
      .map((user) => newUser(user));
  }

  async getUser(id) {
    const user = this.DB.users.findById(id);

    if (user) {
      throw new Error('User user with Id does not exist');
    }

    return newUser(user);
  }
}

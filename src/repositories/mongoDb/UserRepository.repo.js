'use strict';
import MainRepository from './MainRepostory.repository';

export default class UserRepository extends MainRepository {
  constructor(makeDataSource) {
    super(makeDataSource, 'users');
    this.updatePassword = this.updatePassword.bind(this);
    this.build = this.build.bind(this);
  }

  async updatePassword(id, newPassword) {
    return this.updateById(id, { password: newPassword });
  }

  build() {
    return {
      updatePassword: this.updatePassword,
      create: this.create,
      find: this.find,
      findById: this.findById,
      remove: this.remove,
      updateById: this.updateById,
      updateAll: this.updateAll,
    };
  }
}

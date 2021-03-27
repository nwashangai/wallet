'use strict';
import MainRepository from './MainRepository.repository';

export default class VerificationRepository extends MainRepository {
  constructor(makeDataSource) {
    super(makeDataSource, 'verifications');
    this.build = this.build.bind(this);
  }

  build() {
    return {
      create: this.create,
      find: this.find,
      findById: this.findById,
      remove: this.remove,
      updateById: this.updateById,
      updateAll: this.updateAll,
      findOne: this.findOne,
    };
  }
}

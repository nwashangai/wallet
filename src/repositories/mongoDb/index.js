import UserRepository from './UserRepository.repository';
import makeDb from './db';

const userCollection = new UserRepository(makeDb).build();

export default {
  users: userCollection,
};

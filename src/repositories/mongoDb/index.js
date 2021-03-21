import UserRepository from './UserRepository.repo';
import makeDb from './db';

const userCollection = new UserRepository(makeDb).build();

export default {
  users: userCollection,
};

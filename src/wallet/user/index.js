import User from './Entity';

export default (validator, makeHash) => {
  const buildUser = new User({ validator, makeHash });
  return buildUser.createUser;
};

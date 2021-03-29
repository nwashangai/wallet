import User from './Entity';

export default (validator, makeHash, isPasswordMatched, httpStatus) => {
  const buildUser = new User({
    validator,
    makeHash,
    isPasswordMatched,
    httpStatus,
  });
  return buildUser.createUser;
};

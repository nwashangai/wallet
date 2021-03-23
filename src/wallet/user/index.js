import User from './Entity';
import validator from '../../infra/validation';
import { hash } from '../../infra/hashPassword';

// const buildUser = new User({ validator: validator(), makeHash: hash });
// export default buildUser.createUser;

export default (validator, makeHash) => {
  const buildUser = new User({ validator, makeHash });
  return buildUser.createUser;
};

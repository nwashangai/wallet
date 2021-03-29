import Verify from './Entity';

export default (validator, generateCode, httpStatus) => {
  const buildVerify = new Verify({ validator, generateCode, httpStatus });
  return buildVerify.register;
};

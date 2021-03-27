import Verify from './Entity';

export default (validator, generateCode) => {
  const buildVerify = new Verify({ validator, generateCode });
  return buildVerify.register;
};

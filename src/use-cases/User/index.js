import User from './UseCases';
/**import data access**/

export default ({ validation, passwordHash, models }) => {
  return new User({ validation, passwordHash, models }).build();
};

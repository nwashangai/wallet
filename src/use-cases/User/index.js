import User from './UseCases';
/**import data access**/

export default ({ validation, passwordHash, models, httpStatus }) => {
  return new User({ validation, passwordHash, models, httpStatus }).build();
};

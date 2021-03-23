import User from './User';
/**import data access**/

export default function buildUserCase({ DB, validator, makeHash }) {
  return new User({ DB, validator, makeHash }).build();
}

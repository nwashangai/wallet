import User from './User';
/**import data access**/

export default function buildUserCase(DB) {
  return new User(DB).build();
}

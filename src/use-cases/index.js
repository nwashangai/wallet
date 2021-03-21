import Db from '../repositories';

import userCases from './User';

export default { ...userCases(Db) };

import mongoDB from './mongoDb';
import makeDbFn from './mongoDb/db';

export const makeDb = ({ dbDriver, config }) => makeDbFn({ dbDriver, config });

export default ({ makeDb }) => {
  return {
    ...mongoDB({ makeDb }),
  };
};

const createMain = () => {
  return {
    create: (data) => data,
    find: (filter = {}, options = {}) => [
      {
        uid: '1',
        email: 'johndoe@gmail.com',
        name: 'john doe',
        phone: '+123456789',
      },
    ],
    findById: (uid = null) =>
      uid
        ? {
            uid,
            email: 'johndoe@gmail.com',
            name: 'john doe',
            phone: '+123456789',
          }
        : null,
    findOne: (filter = {}, projection = undefined) => ({
      uid: '1',
      name: 'john doe',
      phone: '123456789',
    }),
    remove: (id = null) => (id ? 1 : 0),
    updateById: (uid = null, data = {}) => (uid ? { uid, ...data } : null),
    updateAll: (filter = {}, data = {}) => ({ count: 1 }),
  };
};

const collectionObject = {
  insertOne: (data) => ({ ops: [{ _id: '1234', ...data }] }),
  find: (filter = {}, options = {}) => ({
    toArray: () =>
      filter._id !== null
        ? [{ _id: '1234', name: 'my name', phone: '123456789' }]
        : [],
  }),
  findOne: (filter = {}, projection = undefined) =>
    filter
      ? {
          _id: '1',
          name: 'john doe',
          phone: '123456789',
        }
      : null,
  deleteOne: (filter = {}) => ({ deletedCount: 1 }),
  updateOne: (filter = {}, data = {}) => ({ modifiedCount: 1 }),
  updateMany: (filter = {}, data = {}) => ({ modifiedCount: 1 }),
};

export const buildFakeCollection = (collection) => {
  return {
    [collection]: createMain(),
  };
};

export default () => {
  return {
    collection: (collection) => collectionObject,
  };
};

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
    // findOne: (filter = {}, projection = undefined) => ({
    //   uid: '1',
    //   name: 'john doe',
    //   phone: '123456789',
    // }),
    // remove: (id = null) => (id ? 1 : 0),
    updateOne: (filter = {}, data = {}) => {
      return filter._id ? { uid: filter._id, ...data } : null;
    },
    // updateMany: (filter = {}, data = {}) => ({ count: 1 }),
  };
};

export const buildFakeCollection = (collection) => {
  return {
    ...createMain(),
  };
};

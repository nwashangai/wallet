import buildUserCases from './User';

export default (dependencies) => {
  return { ...buildUserCases(dependencies) };
};

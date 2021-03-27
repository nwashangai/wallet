import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = (password) => bcrypt.hashSync(password, saltRounds);
export const isHashMatched = (password, hash) =>
  bcrypt.compareSync(password, hash);

export default () => {
  return {
    hash,
    isHashMatched,
  };
};

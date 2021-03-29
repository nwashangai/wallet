export default ({ bcrypt }) => {
  const saltRounds = 10;
  const hash = (password) => bcrypt.hashSync(password, saltRounds);
  const isHashMatched = (password, hash) => bcrypt.compareSync(password, hash);

  return {
    hash,
    isHashMatched,
  };
};

import UserController from './controller';

export default ({ userUseCases, verificationUseCases }) => {
  return new UserController({
    userUseCases,
    verificationUseCases,
  }).build();
};

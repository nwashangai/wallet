import Verification from './UseCases';

export default ({
  validation,
  codeGenerator,
  emailService,
  models,
  httpStatus,
}) => {
  return new Verification({
    validation,
    codeGenerator,
    emailService,
    models,
    httpStatus,
  }).build();
};

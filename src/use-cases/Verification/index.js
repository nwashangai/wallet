import Verification from './UseCases';

export default ({ validation, codeGenerator, EmailService, models }) => {
  return new Verification({
    validation,
    codeGenerator,
    EmailService,
    models,
  }).build();
};

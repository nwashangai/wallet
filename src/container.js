import {
  createContainer,
  asValue,
  asClass,
  asFunction,
  InjectionMode,
} from 'awilix';
// you can do this
import userEntity from './wallet/user';
import verificationEntity from './wallet/verification';
import userCases from './use-cases/User';
import verificationCases from './use-cases/Verification';
import DataSource from './db';
import app from './app';
import router from './interfaces/http/router';
import models from './repositories/mongoDb/models';
import config from './config';
import codeGenerator from './infra/codeGenerator';
import EmailService from './infra/EmailService';
import logger from './infra/logger';
import validation from './infra/validation';
import errorWatch from './infra/errorWatch';
import passwordHash from './infra/hashPassword';
import UserController from './controllers/UserController/controller';
import server from './interfaces/http/server';

const container = createContainer({ injectionMode: InjectionMode.PROXY });

// SYSTEM
container.register({
  app: asFunction(app).singleton(),
  userEntity: asClass(userEntity),
  verificationEntity: asClass(verificationEntity),
  userUseCases: asFunction(userCases),
  verificationUseCases: asFunction(verificationCases),
  models: asValue(models),
  config: asValue(config),
  server: asFunction(server).singleton(),
  // dbDriver: asValue(mongodb),
  dataSource: asClass(DataSource).singleton(),
  codeGenerator: asFunction(codeGenerator),
  validation: asFunction(validation),
  errorWatch: asFunction(errorWatch),
  EmailService: asClass(EmailService).singleton(),
  userController: asClass(UserController).singleton(),
  passwordHash: asFunction(passwordHash),
  logger: asFunction(logger).singleton(),
  router: asFunction(router).singleton(),
  // database: asFunction(database).singleton(),
  // auth: asFunction(auth).singleton(),
  // jwt: asFunction(jwt).singleton(),
  // response: asFunction(response).singleton(),
  // date: asFunction(date).singleton(),
  // repository: asFunction(repository).singleton(),
});

export default container;

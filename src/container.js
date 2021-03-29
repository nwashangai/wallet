import {
  createContainer,
  asValue,
  asClass,
  asFunction,
  InjectionMode,
} from 'awilix';
import statusMonitor from 'express-status-monitor';
import httpStatus from 'http-status';
import framework from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import ramda from 'ramda';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import mongoose from 'mongoose';
import fs from 'fs';
import winston from 'winston';
import bcrypt from 'bcrypt';
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
import JWTService from './infra/JWTService';
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
  userEntity: asFunction(userEntity).singleton(),
  verificationEntity: asFunction(verificationEntity).singleton(),
  userUseCases: asFunction(userCases).singleton(),
  verificationUseCases: asFunction(verificationCases).singleton(),
  models: asValue(models),
  config: asValue(config),
  server: asFunction(server).singleton(),
  // dbDriver: asValue(mongodb),
  dataSource: asClass(DataSource).singleton(),
  codeGenerator: asFunction(codeGenerator).singleton(),
  validation: asFunction(validation).singleton(),
  errorWatch: asFunction(errorWatch).singleton(),
  emailService: asClass(EmailService).singleton(),
  jwtService: asClass(JWTService).singleton(),
  userController: asClass(UserController).singleton(),
  passwordHash: asFunction(passwordHash),
  logger: asFunction(logger).singleton(),
  router: asFunction(router).singleton(),
  jwt: asValue(jwt),
  mongoose: asValue(mongoose),
  fs: asValue(fs),
  winston: asValue(winston),
  bcrypt: asValue(bcrypt),
  framework: asValue(framework),
  bodyParser: asValue(bodyParser),
  cors: asValue(cors),
  compression: asValue(compression),
  ramda: asValue(ramda),
  statusMonitor: asValue(statusMonitor),
  httpStatus: asValue(httpStatus),
  morgan: asValue(morgan),
  // auth: asFunction(auth).singleton(),
  // response: asFunction(response).singleton(),
  // date: asFunction(date).singleton(),
  // repository: asFunction(repository).singleton(),
});

export default container;

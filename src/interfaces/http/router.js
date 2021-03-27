import statusMonitor from 'express-status-monitor';
import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { partialRight } from 'ramda';

import container from '../../container';
import httpLogger from './middlewares/http-logger';
import makeCallback from './utils/makeExpressCallback';
import errorHandler from './middlewares/http-error-handler';

export default ({ config, logger }) => {
  const router = Router();
  const apiRouter = Router();

  const UserController = container.resolve('userController');

  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }

  apiRouter
    .use(
      cors({
        // origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    )
    .use(bodyParser.json())
    .use(compression());

  /**
   * Add routes here
   */
  apiRouter.post(
    '/auth/register',
    makeCallback(UserController.startRegistration)
  );

  apiRouter.post(
    '/auth/complete-registration',
    makeCallback(UserController.completeRegistration)
  );

  router.use(`/api/${config.version}`, apiRouter);

  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};

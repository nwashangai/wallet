import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

export default ({ config, router, logger }) => {
  const app = express();

  app.disable('x-powered-by').use(bodyParser.json()).use(compression());

  app.use(router);

  return {
    app,
    start: () =>
      new Promise((resolve) => {
        const http = app.listen(config.port, () => {
          const { port } = http.address();
          logger.info(`🤘 API - Port: ${port}`);
        });
      }),
  };
};

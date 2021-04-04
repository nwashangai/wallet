const path = require('path');
const dotEnvPath = path.resolve('.env');

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath });

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    logging: false, // remove logs
  },
  staging: {
    url: process.env.DATABASE_URL_STAGING,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  production: {
    url: process.env.DATABASE_URL_PRODUCTION,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};

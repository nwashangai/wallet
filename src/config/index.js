import fs from 'fs';
import path from 'path';

require('dotenv').load();

const loadDbConfig = () => {
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  throw new Error('Database is configuration is required');
};

const ENV = process.env.NODE_ENV || 'development';

console.log(ENV, __dirname);

const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();
const config = {
  env: ENV,
  db: dbConfig,
  ...envConfig.default,
};

export default config;

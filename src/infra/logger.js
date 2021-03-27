import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync(`logs`)) {
  fs.mkdirSync(`logs`);
}

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

const logger = ({ config }) => {
  const writer = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log' }),
      new winston.transports.Console(),
    ],
  });

  if (config.env !== 'production') {
    writer.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  return writer;
};

export default logger;

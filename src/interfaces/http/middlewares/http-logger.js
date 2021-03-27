import morgan from 'morgan';

export default (logger) => {
  return morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message.slice(0, -1));
      },
    },
  });
};

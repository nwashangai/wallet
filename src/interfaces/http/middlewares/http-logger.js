export default (logger, morgan) => {
  return morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message.slice(0, -1));
      },
    },
  });
};

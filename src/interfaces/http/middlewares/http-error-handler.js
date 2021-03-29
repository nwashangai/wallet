export default (err, req, res, next, logger, config, httpStatus) => {
  logger.error(err);

  const response = Object.assign(
    {
      type: 'InternalServerError',
    },
    config.env === 'development' && {
      message: err.message,
      stack: err.stack,
    }
  );

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
};

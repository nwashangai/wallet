export default ({ logger }) => {
  return async (callback, callbackParams = undefined) => {
    const statusCodeRegex = /\{.*?\}/;
    try {
      return {
        isSuccessful: true,
        statusCode: 200,
        ...(await callback(callbackParams)),
      };
    } catch (error) {
      const isCustomError = error.message.match(statusCodeRegex);
      const message = error.message.replace(statusCodeRegex, '').trim();
      logger.error(error.message);

      return {
        isSuccessful: false,
        statusCode: isCustomError
          ? Number(isCustomError[0].substring(1, isCustomError[0].length - 1))
          : 500,
        data: {
          message: isCustomError ? message : 'Internal server error',
        },
      };
    }
  };
};

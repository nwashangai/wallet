/**
 * We want to start here so we can manage other infrastructure
 * express server
 */
export default ({ server, dataSource }) => {
  return {
    start: () =>
      Promise.resolve().then(dataSource.connect()).then(server.start),
  };
};

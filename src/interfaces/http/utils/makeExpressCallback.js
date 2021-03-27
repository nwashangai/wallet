import container from '../../../container';

export default (controller) => {
  const { errorWatch } = container.cradle;
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('Authorization'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    errorWatch(controller, httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res
          .status(httpResponse.statusCode || 200)
          .send(httpResponse.data || {});
      })
      .catch((_) => res.status(500).send('System failiure'));
  };
};

import mongo from 'mongodb';

export default ({ dbDriver, config }) => {
  const MongoClient = mongo.MongoClient;
  const url = config.db.url;
  const dbName = 'main';

  return async () => {
    let client = new MongoClient(url, { useNewUrlParser: true });

    if (!client.isConnected()) {
      client = await client.connect();
    }

    client.db(dbName);

    const result = await client.collection('users').findOne();
    console.log('-------', result);

    return client.db(dbName);
  };
};

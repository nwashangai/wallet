import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const url = process.env.YN_WALLET_DB_URL;
const dbName = process.env.YN_WALLET_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true });

export default async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

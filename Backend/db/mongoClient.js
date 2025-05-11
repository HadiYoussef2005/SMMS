import { MongoClient } from 'mongodb';

let client, db;

export async function connectToMongo(){
  if (!client) {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined');
    }
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db('SMMS');
  }
  return db;
}

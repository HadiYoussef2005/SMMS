import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri)
let db;

 export async function connectToMongo(){
    if (!db){
        await client.connect();
        db = client.db('SMMS');
    }
    return db;
}
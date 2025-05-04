import { connectToMongo } from '../db/mongoClient';

class UserAdapter {
    constructor() {
        this.collectionName = 'users';
    }
    async createUser(user){
        const db = await connectToMongo();
        const result = await db.collection(this.collectionName).insertOne()
    }
}
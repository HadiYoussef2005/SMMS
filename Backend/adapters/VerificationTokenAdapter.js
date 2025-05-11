import { connectToMongo } from '../db/mongoClient.js';

class VerificationTokenAdapter {
    constructor() {
        this.collectionName = 'verificationTokens';
    }

    async saveToken(token) {
        const db = await connectToMongo();
        await db.collection(this.collectionName).insertOne(token.toObject());
    }

    async findToken(email, code, type) {
        const db = await connectToMongo();
        const token = await db.collection(this.collectionName).findOne({ email, code, type });
        if (!token || new Date() > new Date(token.expiresAt)) {
            return null; 
        }
        return token;
    }

    async deleteToken(email, type) {
        const db = await connectToMongo();
        await db.collection(this.collectionName).deleteMany({ email, type });
    }

    async deleteSpecificToken(email, code, type) {
        const db = await connectToMongo();
        await db.collection(this.collectionName).deleteOne({ email, code, type });
    }

    async cleanUpExpiredTokens() {
        const db = await connectToMongo();
        await db.collection(this.collectionName).deleteMany({
            expiresAt: { $lt: new Date() } // $lt means less than, so it finds any date less than current date!
        });
    }
}

export default VerificationTokenAdapter;

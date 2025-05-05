import { connectToMongo } from '../db/mongoClient.js';

class MidtermRequestAdapter {
    constructor() {
        this.collectionName = 'midtermRequests';
    }

    async createRequest(midtermRequest) {
        const db = await connectToMongo();
        const result = await db.collection(this.collectionName).insertOne(midtermRequest.toObject());
        return result.insertedId;
    }

    async findRequestById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).findOne({ _id: id });
    }

    async findRequestsByAuthor(authorId) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).find({ author: authorId }).toArray();
    }

    async approveRequest(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).updateOne(
            { _id: id },
            { $set: { status: "Approved", rejectionReason: null } }
        );
    }

    async rejectRequest(id, reason) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).updateOne(
            { _id: id },
            { $set: { status: "Rejected", rejectionReason: reason } }
        );
    }

    async deleteRequestById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).deleteOne({ _id: id });
    }

    async findAllRequests(statusFilter = null) {
        const db = await connectToMongo();
        const query = statusFilter ? { status: statusFilter } : {};
        return await db.collection(this.collectionName).find(query).toArray();
    }
}

export default MidtermRequestAdapter;

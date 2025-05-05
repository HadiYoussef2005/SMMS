import { connectToMongo } from '../db/mongoClient.js';

class CourseRequestAdapter {
    constructor() {
        this.collectionName = 'courseRequests';
    }

    async createRequest(request) {
        const db = await connectToMongo();
        const result = await db.collection(this.collectionName).insertOne(request);
        return result.insertedId;
    }

    async findRequestById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).findOne({ _id: id });
    }

    async updateRequest(request) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).updateOne(
            { _id: request.getId() },
            { $set: request }
        );
    }

    async deleteRequestById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).deleteOne({ _id: id });
    }
}

export default CourseRequestAdapter;

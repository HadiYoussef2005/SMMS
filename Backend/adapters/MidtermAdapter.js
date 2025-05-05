import { connectToMongo } from '../db/mongoClient.js';

class MidtermAdapter {
    constructor() {
        this.collectionName = 'midterms';
    }

    async createMidterm(midterm) {
        try {
            const db = await connectToMongo();
            const midtermData = {
                _id: midterm.getId?.() || undefined,
                courseCode: midterm.getCourseCode(),
                date: midterm.getDate(),
                author: midterm.getAuthor(),
                duration: midterm.getDuration(),
                disciplineTag: midterm.getDisciplineTag?.() || null,
                createdAt: new Date()
            };
            const result = await db.collection(this.collectionName).insertOne(midtermData);
            return result.insertedId;
        } catch (err) {
            console.error('Error creating midterm:', err.message);
            throw err;
        }
    }

    async getMidtermById(id) {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).findOne({ _id: id });
        } catch (err) {
            console.error('Error retrieving midterm by ID:', err.message);
            throw err;
        }
    }

    async getMidtermsByCourseCode(courseCode) {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).find({ courseCode }).toArray();
        } catch (err) {
            console.error('Error retrieving midterms by course code:', err.message);
            throw err;
        }
    }

    async getMidtermsByDisciplineTag(tag) {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).find({ disciplineTag: tag }).toArray();
        } catch (err) {
            console.error('Error retrieving midterms by discipline tag:', err.message);
            throw err;
        }
    }

    async getAllMidterms() {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).find({}).toArray();
        } catch (err) {
            console.error('Error retrieving all midterms:', err.message);
            throw err;
        }
    }

    async updateMidterm(id, updatedFields) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).updateOne(
                { _id: id },
                { $set: updatedFields }
            );
            return result.modifiedCount;
        } catch (err) {
            console.error('Error updating midterm:', err.message);
            throw err;
        }
    }

    async deleteMidterm(id) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).deleteOne({ _id: id });
            return result.deletedCount;
        } catch (err) {
            console.error('Error deleting midterm:', err.message);
            throw err;
        }
    }

    async getMidtermsByTags(tags) {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).find({
                disciplineTag: { $in: tags }
            }).toArray();
        } catch (err) {
            console.error('Error retrieving midterms by tags:', err.message);
            throw err;
        }
    }

    async getMidtermsInDateRange(start, end) {
        try {
            const db = await connectToMongo();
            return await db.collection(this.collectionName).find({
                date: { $gte: start, $lte: end }
            }).toArray();
        } catch (err) {
            console.error('Error retrieving midterms in date range:', err.message);
            throw err;
        }
    }
}

export default MidtermAdapter;

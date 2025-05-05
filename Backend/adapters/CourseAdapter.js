import { connectToMongo } from '../db/mongoClient.js';

class CourseAdapter {
    constructor() {
        this.collectionName = 'courses';
    }

    async createCourse(course) {
        const db = await connectToMongo();
        const result = await db.collection(this.collectionName).insertOne(course);
        return result.insertedId;
    }

    async findCourseById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).findOne({ _id: id });
    }

    async updateCourse(course) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).updateOne(
            { _id: course.getId() },
            { $set: course }
        );
    }

    async deleteCourseById(id) {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).deleteOne({ _id: id });
    }
}

export default CourseAdapter;
import { connectToMongo } from '../db/mongoClient.js';
import UserFactory from '../services/UserFactory.js';

class UserAdapter {
    constructor() {
        this.collectionName = 'users';
    }

    async createUser(user) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).insertOne(user.toObject());
            return result.insertedId;
        } catch (err) {
            console.error('Failed to create user:', err.message);
            throw err;
        }
    }

    async deleteUserById(id) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).deleteOne({ _id: id });
            return result.deletedCount;
        } catch (err) {
            console.error('Failure to delete user:', err.message);
            throw err;
        }
    }

    async updateUser(user) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).updateOne(
                { _id: user.getId() }, 
                { $set: user.toObject() }
            );
            return result.modifiedCount;
        } catch (err) {
            console.error('Failure to update user:', err.message);
            throw err;
        }
    }

    async findUserById(id, includePassword = false) {
        try {
            const db = await connectToMongo();
            const projection = includePassword ? {} : { password: 0 };
            const result = await db.collection(this.collectionName).findOne({ _id: id }, { projection });
            return UserFactory.buildUserFromData(result);
        } catch (err) {
            console.error('Failure in finding user by ID:', err.message);
            throw err;
        }
    }

    async findUserByEmail(email, includePassword = false) {
        try {
            const db = await connectToMongo();
            const projection = includePassword ? {} : { password: 0 };
            const result = await db.collection(this.collectionName).findOne({ email }, { projection });
            return UserFactory.buildUserFromData(result);
        } catch (err) {
            console.error('Failure in finding user by email:', err.message);
            throw err;
        }
    }

    async findAllUsers() {
        const db = await connectToMongo();
        const results = await db.collection(this.collectionName).find({}).toArray();
        return results.map(doc => UserFactory.buildUserFromData(doc));
    }

    async userExistsByEmail(email) {
        const user = await this.findUserByEmail(email, false);
        return !!user;
    }

    async userExistsById(id) {
        const user = await this.findUserById(id, false);
        return !!user;
    }
    async addNotification(userId, notification) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).updateOne(
                { _id: userId },
                { $push: { notifications: notification } }
            );
            return result.modifiedCount > 0;
        } catch (err) {
            console.error('Failed to add notification:', err.message);
            throw err;
        }
    }

    async removeNotification(userId, notification) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).updateOne(
                { _id: userId },
                { $pull: { notifications: notification } }
            );
            return result.modifiedCount > 0;
        } catch (err) {
            console.error('Failed to remove notification:', err.message);
            throw err;
        }
    }

    async clearNotifications(userId) {
        try {
            const db = await connectToMongo();
            const result = await db.collection(this.collectionName).updateOne(
                { _id: userId },
                { $set: { notifications: [] } }
            );
            return result.modifiedCount > 0;
        } catch (err) {
            console.error('Failed to clear notifications:', err.message);
            throw err;
        }
    }

    async getNotifications(userId) {
        try {
            const db = await connectToMongo();
            const user = await db.collection(this.collectionName).findOne(
                { _id: userId },
                { projection: { notifications: 1 } }
            );
            return user ? user.notifications || [] : null;
        } catch (err) {
            console.error('Failed to retrieve notifications:', err.message);
            throw err;
        }
    }

}

export default UserAdapter;

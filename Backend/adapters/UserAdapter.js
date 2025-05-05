import { connectToMongo } from '../db/mongoClient';

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
            const result = await db.collection(this.collectionName).deleteOne({ id: id });
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
                { id: user.getId() },
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
            const result = await db.collection(this.collectionName).findOne({ id: id }, { projection });
            return result;
        } catch (err) {
            console.error('Failure in finding user by ID:', err.message);
            throw err;
        }
    }

    async findUserByEmail(email, includePassword = false) {
        try {
            const db = await connectToMongo();
            const projection = includePassword ? {} : { password: 0 };
            const result = await db.collection(this.collectionName).findOne({ email: email }, { projection });
            return result;
        } catch (err) {
            console.error('Failure in finding user by email:', err.message);
            throw err;
        }
    }

    async findAllUsers() {
        const db = await connectToMongo();
        return await db.collection(this.collectionName).find({}).toArray();
    }

    async userExistsByEmail(email) {
        const user = await this.findUserByEmail(email, false);
        return !!user;
    }

    async userExistsById(id) {
        const user = await this.findUserById(id, false);
        return !!user;
    }
}

export default UserAdapter;
import bcrypt from 'bcrypt';

class Encryptor {
    #saltRounds;

    constructor() {
        this.#saltRounds = parseInt(process.env.SALT_ROUNDS) || 11;
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.#saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async comparePasswords(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default Encryptor;
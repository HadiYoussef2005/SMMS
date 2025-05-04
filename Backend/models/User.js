import Encryptor from '../services/Encryptor.js';

class User {
    #firstName;
    #lastName;
    #email;
    #password;
    #notifications;
    #submissionHistory;
    #isAdmin;

    constructor(firstName, lastName, email, hashedPassword, isAdmin) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = hashedPassword; 
        this.#isAdmin = isAdmin;
        this.#notifications = [];
        this.#submissionHistory = [];
    }

    static async create(firstName, lastName, email, rawPassword, isAdmin) {
        const encryptor = new Encryptor();
        const hashedPassword = await encryptor.hashPassword(rawPassword);
        return new User(firstName, lastName, email, hashedPassword, isAdmin);
    }

    getUsername() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    async setPassword(rawPassword) {
        const encryptor = new Encryptor();
        this.#password = await encryptor.hashPassword(rawPassword);
    }

    getNotifications() {
        return this.#notifications;
    }

    addNotification(notification) {
        this.#notifications.push(notification);
    }

    clearNotifications() {
        this.#notifications = [];
    }

    getSubmissionHistory() {
        return this.#submissionHistory;
    }

    addSubmission(submissionId) {
        this.#submissionHistory.push(submissionId);
    }

    isAdmin() {
        return this.#isAdmin;
    }

    setIsAdmin(isAdmin) {
        this.#isAdmin = isAdmin;
    }

    toObject() {
        return {
            username: this.getUsername(),
            email: this.getEmail(),
            password: this.getPassword(),
            isAdmin: this.getIsAdmin(),
            notifications: this.getNotifications(),
            submissionHistory: this.getSubmissionHistory(),
        };
    }
}

export default User;
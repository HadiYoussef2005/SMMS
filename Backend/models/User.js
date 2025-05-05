import Encryptor from '../services/Encryptor.js';
import Id from '../services/Id.js'; 

class User {
    #id;
    #firstName;
    #lastName;
    #email;
    #password;
    #notifications;
    #submissionHistory;
    #isAdmin;
    #type;

    constructor(id, firstName, lastName, email, hashedPassword, isAdmin, type = "User") {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = hashedPassword; 
        this.#isAdmin = isAdmin;
        this.#notifications = [];
        this.#submissionHistory = [];
        this.#type = type;
    }

    static async create(firstName, lastName, email, rawPassword, isAdmin) {
        const encryptor = new Encryptor();
        const hashedPassword = await encryptor.hashPassword(rawPassword);
        const id = new Id();
        return new User(id.getId(), firstName, lastName, email, hashedPassword, isAdmin);
    }
    getType(){
        return this.#type;
    }
    setType(type){
        this.#type = type;
    }
    getId(){
        return this.#id;
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
    setNotifications(notifications) {
        this.#notifications = notifications;
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
    setSubmissionHistory(history) {
        this.#submissionHistory = history;
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

    setFirstName(firstName) {
        this.#firstName = firstName;
    }
    setLastName(lastName) {
        this.#lastName = lastName;
    }
    setEmail(email) {
        this.#email = email;
    }
    toObject() {
        return {
            _id: this.getId(),
            type: this.getType(),
            username: this.getUsername(),
            email: this.getEmail(),
            password: this.getPassword(),
            isAdmin: this.isAdmin(), 
            notifications: this.getNotifications(),
            submissionHistory: this.getSubmissionHistory(),
        };
    }
}

export default User;

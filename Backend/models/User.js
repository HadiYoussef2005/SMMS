class User {
    #firstName;
    #lastName;
    #email;
    #password;
    #notifications;
    #submissionHistory;
    #isAdmin;
    #isSuperAdmin;
    constructor(firstName, lastName, email, password, isAdmin, isSuperAdmin) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
        this.#isAdmin = isAdmin;
        this.#isSuperAdmin = isSuperAdmin;
        this.#notifications = [];
        this.#submissionHistory = [];
    }
    getUsername() {
        return `${this.#firstName} ${this.#lastName}`;
    }
    setUsername(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }
    getEmail() {
        return this.#email;
    }
    setEmail(email) {
        this.#email = email;
    }
    setPassword(password) {
        this.#password = password;
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
    isAdmin(){
        return this.#isAdmin;
    }
    setIsAdmin(isAdmin){
        this.#isAdmin = isAdmin;
    }
    getIsSuperAdmin(){
        return this.#isSuperAdmin;
    }
    setIsSuperAdmin(isSuperAdmin){
        this.#isSuperAdmin = isSuperAdmin;
    }
}
export default User;
